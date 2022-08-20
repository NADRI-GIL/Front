import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const data=[
   { id : 0, location: "서울", name:"경복궁", image : "images.jpg", detail : "경복궁은 1395년 태조 이성계에 의해서 새로운 조선왕조의 법궁으로 지어졌다. "},
   { id : 1, location: "서울", name:"name", image : "images.jpg", detail : "경복궁은 1395년 태조 이성계에 의해서 새로운 조선왕조의 법궁으로 지어졌다. "},
   { id : 2, location: "서울", name:"경복궁", image : "images.jpg", detail : "경복궁은 1395년 태조 이성계에 의해서 새로운 조선왕조의 법궁으로 지어졌다. "},
   { id : 3, location: "서울", name:"name", image : "images.jpg", detail : "경복궁은 1395년 태조 이성계에 의해서 새로운 조선왕조의 법궁으로 지어졌다. "},
   { id : 4, location: "서울", name:"경복궁", image : "images.jpg", detail : "경복궁은 1395년 태조 이성계에 의해서 새로운 조선왕조의 법궁으로 지어졌다. "},
   { id : 5, location: "서울", name:"name", image : "images.jpg", detail : "경복궁은 1395년 태조 이성계에 의해서 새로운 조선왕조의 법궁으로 지어졌다. "},
  ]

  return(
  <div>
        <Swiper spaceBetween={50} slidesPerView={4} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
          {data.map((e)=> {
          return( <SwiperSlide> 
          <Link to = "../Detail" state={e}>
              <div className="trend">
                    <div className="t_image">
                    <img className="t_image" src={e.image} alt="Second slide"/>
                    </div>
                    <div clalssName="t_text">
                        <h5 className ="tt2">{e.location} {e.name}</h5>
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


class Main extends React.Component{
  render(){
      return (
          <div className ="app_main">
              <ControlledCarousel/> 
              <Swipe/>
          </div>
      );
  }
}
export default Main;
