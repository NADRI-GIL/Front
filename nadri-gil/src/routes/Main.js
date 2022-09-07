import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"; 
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import mypic from './iconsearch.png'

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


//swiper
function Swipe() {
  const [travel,setTravels] = useState(0);
  
  const fetchTravel = async () => {
         {const response = await axios.get("http://43.200.49.4:8080/travels/1/detail");
         setTravels(response.data.list);
          console.log(response.data.list);}
  };

  useEffect( () =>{
      fetchTravel();
  },[] )

  if (!travel) return null; 
  
  return(
  <div>
        <Swiper spaceBetween={50} slidesPerView={4} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
          {travel.map((e)=> {
          return( <SwiperSlide> 
          <Link to = "../TravelDetail" state={e}>
              <div style={{margin:"5px", height:"270px"}}>
                    <div >
                    <img style={{minHeight:'200px', width:'200px'}}  src={e.image} alt="Second slide"/>
                    </div>
                    <div  style={{position:'absolute',textAlign:"center", marginTop:"20px"}}>
                        <h5 style={{textAlign:'center', justifiyCenter:"center", width:"100%", marign:"0 auto"}}>{e.name}</h5>
                        <h5 style={{textAlign:'center', justifiyCenter:"center", width:"100%", marign:"0 auto"}}>{e.address}</h5>
                    </div>
                </div>
            </Link>
         </SwiperSlide>  
          )
        })}
      </Swiper> 
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
    <div sytle={{width: "100%"}}>
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

return(
<></>
)
}


class Main extends React.Component{
  render(){ 
      return (
          <div style={{justifyContent: "center"}}>
              <ControlledCarousel/> 
              <Swipe/>
              <div style={{width:"70%", margin:"0 auto"}}>
              <Notice/>
              <Course/>
              </div>
          </div>
      );
  }
}
export default Main;
