import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Main.css";
import axios from "axios";
import mypic from './iconsearch.png';
// import { useQuery } from "react-query";
import { getMain } from "../api.js";


function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const data1 = [
        { id : 0, name : '경복궁'},
        { id : 1, name : '경복궁1'},
        { id : 2, name : '경복궁2'},
    ]


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  console.log(data1.image);

  return (
    <Carousel style={{height:"280px"}} activeIndex={index} onSelect={handleSelect}>
       {data1.map((e)=> {
          return(
      <Carousel.Item style={{}}>
        <img src={mypic} style={{height:"280px", widht:"100%"}}alt="f slide"/>
      </Carousel.Item>
        )
      })}
    </Carousel>
    );
}

function Rank() {

  console.log("dfsf");

  const { isLoading, isError, error, data } = useQuery('Main', getMain,{
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
     <div class="title"><h4>인기순</h4><Link className="text_link" to= "./"><h6>전체보기</h6></Link></div>
      <div class="swipe">
            <Swiper spaceBetween={0} slidesPerView={4} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
              {data?.data.list.map((e)=> {
              return( <SwiperSlide>
              <Link className="text_link" to = "../TravelDetail" state={e}>
                  <div class ="swipe_div">
                    <div class ="swipe_imgbox">
                        <img class="swipe_img"  key={e.id}  src={e.image} alt="Second slide"/>
                    </div>
                        <div>
                            <h5  class="swipe_h5" key={e.id}>{e.location} {e.name}</h5>
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

  console.log("dfsf");

  const { isLoading, isError, error, data } = useQuery('Main', getMain,{
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
     <div class="title"><h4>추천순</h4><Link className="text_link" to= "./"><h6>전체보기</h6></Link></div>
      <div class="swipe">
            <Swiper spaceBetween={0} slidesPerView={4} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
              {data?.data.list.map((e)=> {
              return( <SwiperSlide>
              <Link className="text_link" to = "../TravelDetail" state={e}>
                  <div class ="swipe_div">
                        <img class="swipe_img"  key={e.id}  src={e.image} alt="Second slide"/>
                        <div>
                            <h5  class="swipe_h5" key={e.id}>{e.location} {e.name}</h5>
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

class Main extends React.Component{
  render(){
      return (
          <div class="main" >
              <ControlledCarousel/>
              <Rank/>
              <Recommend/>
               <div style={{width: "50%", margin:"0 auto"}}>
              <Notice />
              <Course/>
              </div> 
          </div>
      );
  }
}
export default Main;
