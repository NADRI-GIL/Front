import React, { useState, useEffect, useRef } from 'react';
import {FaMapMarkerAlt } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";

const Container = styled.div`
width: 50%;
margin: 0 auto;
font-family: 'SUIT';
@media screen and (max-width: 900px) {
width: 100%;
}
`;

const Content = styled.div`

border: 1px solid;

// ::after {
//     content: '';
//     position: absolute;
//     display: block;
//     left: 0;
//     right: -1px;
//     top: 80px;
//     border: 1px dashed #797979;
//   }
`;

const Hr = styled.hr`
border: 0;
height: 1px;
margin: 1vh 0 1vh 0;  
background-color: #595959;
`

function Course() {

  const data1 =[
        {course_id: 1, travel_id : 26343, name : '청계천' },
        {course_id: 1,travel_id : 27144, name :'광화문'},
        {course_id: 1,travel_id : 26801, name : '광장시장' },
        {course_id: 1,travel_id : 27159, name : '남산 케이블카' },
        {course_id: 1,travel_id : 26195, name : '동대문 종합시장·동대문 쇼핑타운' },
    ]
    const data2 =[
      {course_id: 1, travel_id : 15993, name : '익산 미륵사지 [유네스코 세계유산]' },
      {course_id: 1,travel_id : 27850, name :'웅포관광지 캠핑장'},
      {course_id: 1,travel_id : 29678, name : '함벽정' },
      {course_id: 1,travel_id : 7279, name : '보석박물관' }
  ]
    const courselist = [
        {course_id : 1},
        {course_id : 2},
        {course_id : 3},

        
    ]

    return(
        <Container>
            <h3>코스</h3>
            <h5>지자체 추천 코스</h5> 
                    <h5>코스 이름</h5>
                    <h6>코스 간단 소개</h6>
            <Swiper spaceBetween={10} navigation slidesPerView={4} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)}>
              {data1.map((e)=> {
              return( <SwiperSlide >
                    <div style={{textAlign:"center", width:"120px"}}>
                    <FaMapMarkerAlt color="#3366ff"  size="50"/>
                    <div><h7>{e.name}</h7></div>
                    </div>
                
            </SwiperSlide>
              )
            })}
          </Swiper>

             <div style={{display: "flex",  justifyContent:"space-around", marginTop:"20px"}}>
                {courselist.map((el) =>{ return(
                    <div style={{display:"block", textAlign:"center"}}>
                    <div style={{width:"180px", height:"180px", borderRadius:"50%",backgroundColor:"grey", display:"block"}}>
                     </div>
                     <h5>코스 이름</h5>
                     </div>
                )})}
              
            </div> 

        </Container>
    )
}

export default Course;