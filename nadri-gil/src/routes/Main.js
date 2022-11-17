import React, { useState } from 'react';
import { useQuery } from "react-query";
import Carousel from 'react-bootstrap/Carousel';
import {Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { loginIdAtom } from "../atom.js"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Main.css";
import { getMain, getStar, getRecommend , getMostHeart} from "../api.js";
import { constSelector, useRecoilValue } from "recoil";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const data1 = [
        { id : 0, src : 'img/banner1.png', link : '/Course'},
        { id : 1, src : 'img/banner2.png', link : '/travellistheart'},
        { id : 2, src : 'img/banner3.png', link : '/notice/noticecontent'},
    ]


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel fade >
       {data1.map((e)=> {
          return(
      <Carousel.Item >
        <Link to = {e.link} >
        <img  className="d-block w-100" src={e.src} style={{objectFit: "contain", borderRadius : "20px"}} alt=""/>
        </Link>
      </Carousel.Item>
        )
      })}
    </Carousel>
    );
}

function Rank() {
  const { isLoading, isError, error, data } = useQuery('mostHeart', getMostHeart,{
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry : 0,
    onSuccess: data => {  
      // 성공시 호출
      console.log(data);
    },
    onError : data =>{
      console.log(error);
    }
  });


  return(
    <div >  
     <div className="title"><h4>인기순</h4><Link className="text_link" to= "./travelList"><h6>전체보기</h6></Link></div>
      <div className="swipe">
            <Swiper spaceBetween={10} slidesPerView={4}>
              {data?.list.map((e)=> {
              return( <SwiperSlide>
              <Link className="text_link" to = {`/TravelDetail/${e.id}`} state={e}>
                  <div class ="swipe_div">
                    <div class ="swipe_imgbox">
                        <img class="swipe_img"  key={e.id}  src={e.image} alt="Second slide"/>
                    </div>
                        <div>
                            <h5  className="swipe_h5" key={e.id}>{e.location} {e.name}</h5>
                        </div>
                    </div>
                </Link>
            </SwiperSlide>
              )
            })}
          </Swiper>
      </div>
  </div>
  )
}

function Recommend() {
  const loginId = useRecoilValue(loginIdAtom);

  const { isLoading, isError, error, data } = useQuery(['Recommend', loginId],()=> getRecommend(loginId),{
 
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: data => {
      // 성공시 호출
      console.log(data);
    },
    onError : data =>{
      console.log(error);
    }
  });

  return(
    <div>
     <div className="title"><h4>추천순</h4><Link className="text_link" to= "./travelRecommendList"><h6>전체보기</h6></Link></div>
      <div className="swipe">
            <Swiper spaceBetween={10} slidesPerView={4} >
              {data?.list.map((e)=> {
              return( <SwiperSlide>
              <Link className="text_link" to = {`/TravelDetail/${e.id}`}state={e}>
                  <div class ="swipe_div">
                  <div class ="swipe_imgbox">
                        <img class="swipe_img"  key={e.id}  src={e.image} alt="Second slide"/>
                        </div>
                        <div>
                            <h5  className="swipe_h5" key={e.id}>{e.location} {e.name}</h5>
                        </div>
                    </div>
                </Link>
            </SwiperSlide>
              )
            })}
          </Swiper>
      </div>
  </div>
  )
}

function Star(){

  const { isLoading, isError, error, data } = useQuery('Star', getStar,{
 
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: data => {
      // 성공시 호출
      console.log(data);
    },
    onError : data =>{
      console.log(error);
    }
  });


  return(
    <div>
    <div className="title"><h4>별점순</h4><Link className="text_link" to= "./travelList"><h6>전체보기</h6></Link></div>
     <div className="swipe">
           <Swiper spaceBetween={10} slidesPerView={4} >
             {data?.list.map((e)=> {
             return( <SwiperSlide>
             <Link className="text_link" to = {`/TravelDetail/${e.id}`}state={e}>
                 <div class ="swipe_div">
                 <div class ="swipe_imgbox">
                       <img class="swipe_img"  key={e.id}  src={e.image} alt="Second slide"/>
                       </div>
                       <div>
                           <h5  className="swipe_h5" key={e.id}>{e.location} {e.name}</h5>
                       </div>
                   </div>
               </Link>
           </SwiperSlide>
             )
           })}
         </Swiper>
     </div>
 </div>
  )
}


function Notice(){
  const data=[
    { notice_id : 0, user_id : "user", register_date :"202202022", title:"제목", content : "내용" },
    { notice_id : 1, user_id : "user", register_date :"202202022", title:"제목", content : "내용" },
    { notice_id : 2, user_id : "user", register_date :"202202022", title:"제목", content : "내용" },
    ]

  return(
    <div style={{float:'left', marginRight:"400px"}}>
      <h5>공지사항</h5>
      <Link to = "../Notice">
        <button>+</button>
      </Link>
      <ul>
        {data.map((e)=>{
          return (
              <li><a href="#">{e.title}</a></li>
          )
        })}
      </ul>
    </div>
  )
}


function Course(){

  const data=[
    { notice_id : 0, user_id : "user", register_date :"202202022", title:"제목", content : "내용" },
    { notice_id : 1, user_id : "user", register_date :"202202022", title:"제목", content : "내용" },
    { notice_id : 2, user_id : "user", register_date :"202202022", title:"제목", content : "내용" },
    ]

  return(
    <div style={{float: "left"}}>
      <h5>코스</h5>
      <Link to = "../Notice">
        <button>+</button>
      </Link>
      <ul>
        {data.map((e)=>{
          return (
              <li><a href="#">{e.title}</a></li>
          )
        })}
      </ul>
    </div>
  )
}

function Main() {

  
const loginId = useRecoilValue(loginIdAtom);


  return (
    <div className="main" >
    <ControlledCarousel/>
    <Rank/>
    {loginId !='' ?   <> <Recommend/><Star/></> : <Star/>  }
  
     <div style={{width: "50%", margin:"0 auto"}}>
    {/* <Notice />
    <Course/> */}

    </div> 
</div>
  )
}



export default Main;
