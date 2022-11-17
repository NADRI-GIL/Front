import React, { useState, useEffect, useRef } from 'react';
import {FaMapMarkerAlt, FaQuoteLeft } from 'react-icons/fa';
import {Link } from 'react-router-dom';
import { SlArrowRight,SlArrowLeft } from 'react-icons/sl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { faQuoteLeft, faQuoteRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from "styled-components";
import { getSharedCourse, getTravelDetail } from "../api.js";
import { useQuery } from "react-query";

const Cont = styled.div`
margin-top:1vh;
width:25%;
// height:22vh;
padding:5px;
// text-align:center;
color:black;

    img{
        object-fit: cover;
        height:15vh;
        // overflow: hidden;
        width:100%;
    }

`;

const Container = styled.div`
width: 50%;
margin: 0 auto;
font-family: 'SUIT';
@media screen and (max-width: 900px) {
width: 100%;
}
`;

const Content = styled.div`


button { 
  border: 0;
  background-color: transparent;

  h6{
    margin-top:10px;
  }
}

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
const NextButton = styled.button`
padding: 0;
background: none;
border:none;

`
const PrevButton = styled.button`
padding: 0;
background: none;
border:none;
`

const Title = styled.p`
margin:auto 0;
font-family: 'SUIT';
font-size:1vw;
`
const Name = styled.p`
font-size:0.6vw;
padding-left:0.6vw;
`
const Delete = styled.p`
font-size:0.6vw;
margin:auto 0;
color:#B8B8B8;
margin-left: auto;
block:inline;
padding-right:1vw;
cursor:pointer;
`
const Info = styled.div`
float:right;
font-family: 'SUIT';
font-size:1.3w;
margin:1vh;
button{
    background-color:#3366ff;
    color:#ffffff;
    border:none;
    border-radius: 10px;
    margin-left:0.5vw;
    padding: 0 0.5vw 0 0.5vw;
}
`
const CompleteButton = styled.button`
float:right;
font-family: 'SUIT';
box-sizing: border-box;
background-color:#3366ff;
color:#ffffff;
border:none;
border-radius: 10px;
height: 6vh;
font-size:0.8vw;
padding:0 7vh 0 7vh;
margin:auto;
margin-top:2vh;
`
const StyledLink = styled(Link)`
	color:black;
`;

const ContentList = styled.div`
display:flex;
flex-wrap:wrap;
width:100%;
margin:auto;
margin-top:3vh;
`

function Course(props) {

  const [data1, setData] = useState([
      {course_id: 1, travel_id : 1831, name : '서우봉둘레길' },
      {course_id: 1,travel_id : 27161, name :'제주4·3평화공원'},
      {course_id: 1,travel_id : 25535, name : '쇠소깍' },
      {course_id: 1,travel_id : 28678, name : '정방폭포' },
      {course_id: 1,travel_id : 4921, name : '사계해변' },
      {course_id: 1,travel_id : 29617, name : '알뜨르비행장 및 일본군 비행기 격납고' },
    ]);

  const [Info, setInfo] = useState( [{course_id : 1, title : "제주올레길", content : "제주 올레길은 골목길들이 크게 하나로 이어지는 제주도 도보 여행 코스이다. 총 26코스 425km으로 이어진 올레길은 겉으로 잘 보이지 않는 제주의 아름다운 속살을 다채롭게 보여준다. 길 따라 걷다 보면 신천 바다목장의 주황색 귤 꽃밭, 제주도 명소인 민물과 바닷물이 만나는 쇠소깍도 만날 수 있다. 제주도가 사시사철 매 순간 다양한 모습을 보여주듯 천천히 걸을수록 더 많은 것을 볼 수 있다."}]
  );

  const courseInfo = [
    [{course_id : 1, title : "제주올레길", content : "제주 올레길은 골목길들이 크게 하나로 이어지는 제주도 도보 여행 코스이다. 총 26코스 425km으로 이어진 올레길은 겉으로 잘 보이지 않는 제주의 아름다운 속살을 다채롭게 보여준다. 길 따라 걷다 보면 신천 바다목장의 주황색 귤 꽃밭, 제주도 명소인 민물과 바닷물이 만나는 쇠소깍도 만날 수 있다. 제주도가 사시사철 매 순간 다양한 모습을 보여주듯 천천히 걸을수록 더 많은 것을 볼 수 있다."},
  ],
  [{course_id: 2,title: "역사 위에 피어난 봄", content:"익산의 벚꽃 여행지로는 보석박물관과 왕궁리 유적지, 송천마을이 유명하다. 보석박물관은 희귀한 보석과 광물 등 11만 8,000여 점을 소장, 전시한 곳으로, 박물관 옆에 보석을 파는 주얼펠리스에서 나오면 함벽정이 기다린다. 함벽정 아래 벚꽃이 보석처럼 반짝이고, 왕궁저수지에서 불어오는 시원한 바람에 봄꽃 향기가 느껴진다. 웅포관광지에서의 캠핑과 벚꽃의 향연을 놓치지 말자."},
  ],
  [  {course_id : 3, title: "아름다운 풍경을 자랑하는 제천 & 단양 여행 코스", content:"사진 촬영 명소인 단양 이끼터널에서 시작하는 충북 여행 코스! 다누리아쿠아리움, 단양구경시장(1,6일)을 지나 도담삼봉, 제천 옥순봉 출렁다리로 이어지는 여행길에 두 눈 가득 단양과 제천의 아름다운 풍경을 담아본다. 청풍호반케이블카에서 자연 풍광을 몸소 체험하고 즐긴 후 명가박달재에서 맛있는 식사를 한다. 의림지에서 휴식을 즐기고 엽연초하우스에서 머물며 알차게 보낸 여행을 마무리한다."}
  ]  
]

  const courselist = [
    [
      {course_id: 1, travel_id : 1831, name : '서우봉둘레길' },
      {course_id: 1,travel_id : 27161, name :'제주4·3평화공원'},
      {course_id: 1,travel_id : 25535, name : '쇠소깍' },
      {course_id: 1,travel_id : 28678, name : '정방폭포' },
      {course_id: 1,travel_id : 4921, name : '사계해변' },
      {course_id: 1,travel_id : 29617, name : '알뜨르비행장 및 일본군 비행기 격납고' },
    ],
    [
        {course_id: 2, travel_id :15993, name : '익산 미륵사지 [유네스코 세계유산]' },
        {course_id: 2,travel_id : 27850, name :'웅포관광지 캠핑장'},
        {course_id: 2,travel_id : 29678, name : '함벽정' },
        {course_id: 2,travel_id : 7279, name : '보석박물관' }
    ],

    [
      {course_id: 3, travel_id : 11691, name : '이끼터널' },
      {course_id: 3,travel_id : 31541, name :'단양구경시장'},
      {course_id: 3,travel_id : 15992, name : '청풍호반케이블카' },
      {course_id: 3,travel_id : 32553, name : '명가박달재' },
      {course_id: 3,travel_id : 16084, name : '제천 의림지와 제림' },
      {course_id: 3,travel_id : 7645, name : ' 엽연초하우스' },
    ]
  ]

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const {  slidesPerView } = 4;

    const { data:shared } = useQuery('SharedCourse', getSharedCourse,{
 
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: data => {
        console.log(data);
      },
    });

    // const { data:course2 } = useQuery(['TravelDetail1', 15993], () => getTravelDetail(15993), {
    //   cacheTime: Infinity,
    //   staleTime: Infinity,
    //   refetchOnMount: false,
    //   refetchOnWindowFocus: false,
    //   retry: 0, 
    //   onSuccess: course2 => {
    //     // 성공시 호출
    //     console.log("1", course2);
    //   },
    // })

    // const { data:course3 } = useQuery(['TravelDetail2', 1831], () => getTravelDetail(1831), {
    //   cacheTime: Infinity,
    //   staleTime: Infinity,
    //   refetchOnMount: false,
    //   refetchOnWindowFocus: false,
    //   retry: 0,
    //   onSuccess: data => {
    //     // 성공시 호출
    //     console.log("2", data);
    //   },
    // })

    // const { data:course4 } = useQuery(['TravelDetail', 11691], () => getTravelDetail(11691), {
    //   cacheTime: Infinity,
    //   staleTime: Infinity,
    //   refetchOnMount: false,
    //   refetchOnWindowFocus: false,
    //   retry: 0,
    //   onSuccess: data => {
    //     // 성공시 호출
    //     console.log("3", data);
    //   },
    // })

    SwiperCore.use([Navigation]);
  const [swiperSetting, setSwiperSetting] = useState(null);

  useEffect(() => {

    if (!swiperSetting) {
      setSwiperSetting({
        spaceBetween: 0,
        navigation: {
          prevEl: prevRef.current, // 이전 버튼
          nextEl: nextRef.current, // 다음 버튼
        },
      
       slidesPerView: 4,
        onBeforeInit: (swiper) => {
          if (typeof swiper.params.navigation !== 'boolean') 
          {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }
          swiper.navigation.update();
        },
      });
    }
  },[swiperSetting, slidesPerView]);

  const navigationChange =(e) => {
    setData(courselist[e]);
    setInfo(courseInfo[e]);
  }

    return(
        <Container>
            <h3><b>코스</b></h3>
            <Hr/>
            <h4 style={{marginTop:"20px"}}>지자체 추천 코스</h4>
            {Info.map((e)=>{return(<>
             <div style={{display:"flex", marginBottom:"30px",  justifyContent: "center" ,textAlign:"center"}}>
              <FontAwesomeIcon icon ={faQuoteLeft} /> 
             <h5 style={{textAlign:"center",background: "linear-gradient(to top, rgb(255 231 56) 50%, transparent 50%)",padding: "5px 10px"}}><b>{e.title}</b></h5>
             <FontAwesomeIcon icon ={faQuoteRight} /> 
             </div>
  
            <div style={{display:"flex" , marginBottom:"20px", backgroundColor: "#faf7f7", padding: "20px 0", borderRadius: "10px"}}>
              <PrevButton ref={prevRef}><SlArrowLeft size="20"/></PrevButton>
              {swiperSetting && (  <Swiper {...swiperSetting}>
                {data1.map((e)=> {
                return( <SwiperSlide >
                      <div style={{textAlign:"center", width:"120px"}}>
                        <FaMapMarkerAlt color="#3366ff"  size="50"/>
                        <div ><h7>{e.name}</h7></div>
                      </div>
              </SwiperSlide>
                )
              })}
            </Swiper>
              )}          
              <NextButton ref={nextRef}><SlArrowRight size="20" /> </NextButton>
          </div> 
          <h6>{e.content}</h6>
              </> )})} 
            <Content style={{marginBottom:"20px", display: "flex", textAlign:"center",  justifyContent:"space-around", marginTop:"20px"}}>
              <button onClick={()=>navigationChange(0)}>
                  <div style={{width:"180px",margin:"0 20px", height:"180px", borderRadius:"50%", display:"block", overflow:"hidden"}}>
                 {/* <img style={{objectFit:"cover", width:"100%", height:"100%"}} src ="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=92ba3130-e1b8-497a-b4df-27f663636b52"></img> */}
                 <img style={{objectFit:"cover", width:"100%", height:"100%"}} src ="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=17a09a42-749d-476c-9f1b-88a8da8acf30"></img>

                  </div>
                  <h6>제주올레길</h6>
              </button>
              
              <button onClick={()=>navigationChange(1)}>
                <div style={{width:"180px", margin:"0 20px", height:"180px", borderRadius:"50%", display:"block", overflow:"hidden"}}>
               <img style={{objectFit:"cover", width:"100%", height:"100%"}} src ="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=d34b9fd3-9abc-425d-9152-6a83b0676683"></img>   
                </div>
                  <h6>역사 위에 피어난 봄</h6>
              </button>

                <button onClick={()=>navigationChange(2)}>
                  <div style={{width:"180px",margin:"0 20px", height:"180px", borderRadius:"50%", display:"block", overflow:"hidden"}}>
                 <img style={{objectFit:"cover", width:"100%", height:"100%"}} src ="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=3ab295c3-78a9-40f0-aa8e-92be0c6152f0"></img>
                  </div>
                  <h6>아름다운 풍경을 자랑하는<br></br> 제천 & 단양 여행 코스</h6>
                  </button>
            </Content>
            <Hr/>
            <div style={{marginTop: "20px"}}>
              <h4>코스 공유 목록</h4>
              <ContentList>
              {
              shared?.list.map((item) => {
                    return (
                        <Cont>
                          <div style={{display:'flex'}}>
                            <StyledLink to ={`/viewcourse/${item.id}`}>
                            <Title>{item.name}</Title>
                            </StyledLink>
                            {/* <Delete onClick={()=>{onClinkDeleteCourse(item.id, item.name)}}>삭제</Delete> */}
                          </div>
                          <StyledLink to ={`/viewcourse/${item.id}`}>
                            <div style={{ borderLeft: "0.2vw solid #3366ff", marginTop:"2vh"}}>
                            {item.courseTravels.map((travelname)=>
                            <Name>{travelname.travelName}</Name>)}
                            </div>
                          </StyledLink> 
                        </Cont>
                    )
                })
                } 
                </ContentList>
            </div>
              
        </Container>
    )
}

export default Course;