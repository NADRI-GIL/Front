import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const data = [
        { id : 0, name : '경복궁', image : 'images.jpg'},
        { id : 1, name : '경복궁1', image : 'images.jpg'},
        { id : 2, name : '경복궁2', image : 'images.jpg'},
    ]


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);

  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
       {data.map((e)=> {
          return( 
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={e.image}
          alt="First slide"
        />
      </Carousel.Item>
        )
      })}
    </Carousel>
    );
}


function Swipe() {

  const [travel,setTravels] = useState(null);   //결과값

  const fetchTravel = async () => {
          setTravels(null);
          const response = await axios.get("http://43.200.49.4:8080/travels/1/detail");
          setTravels(response.data.list);
          console.log(response);
  };

  useEffect( () =>{
      
      fetchTravel();
  },[] )


  if (!travel) return null;  //users값이 유효하지 않는 경우

  
  return(
  <div>
        <Swiper spaceBetween={50} slidesPerView={4} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
          {travel.map((e)=> {
          return( <SwiperSlide> 
          <Link to = "../TravelDetail" state={e}>
              <div classsName="trend" style={{margin:"5px", height:"270px"}}>
                    <div className="t_image">
                    <img style={{minHeight:'200px'}} className="t_image" src={e.image} alt="Second slide"/>
                    </div>
                    <div clalssName="t_text" style={{position:'absolute',textAlign:"center", marginTop:"20px"}}>
                        <h5 className ="tt2"style={{textAlign:'center', justifiyCenter:"center", width:"100%", marign:"0 auto"}}>{e.name} {e.id}</h5>
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
    <div>
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



class Main extends React.Component{
  render(){ 
      return (
          <div className ="app_main">
              <ControlledCarousel/> 
              <Swipe/>
              <Notice/>
          </div>
      );
  }
}
export default Main;
