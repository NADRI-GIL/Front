import { render } from '@testing-library/react';
import React, {useState}from 'react';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row, Container } from 'react-bootstrap';
import {Carousel } from 'react-bootstrap';
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useLocation, Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';



class Banner extends React.Component{
    render(){
        return (
        <Carousel className="car">
  <Carousel.Item className ="carI">
    <img
      className="d-block w-100"
      src="./image/iconsearch.png"
      alt="First slide"
    />
    <Carousel.Caption>
      {/* <h3>First slide label</h3> */}
      {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item className ="carI">
    <img
      className="d-block w-100"
      src="./image/iconsearch.png"
      alt="Second slide"
    />

    <Carousel.Caption>
      {/* <h3>Second slide label</h3> */}
      {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item className ="carI">
    <img
      className="d-block w-100"
      src="image/iconsearch.png"
      alt="Third slide"
    />

    <Carousel.Caption>
      {/* <h3>Third slide label</h3> */}
      {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        );
    }
}


// class Trend extends React.Component{
    const Trend =(props) =>{

        const data1={
         location: "서울",
         name:"경복궁",
         picture :  "./image/gyeoungbuk.jpg",
        detail : "경복궁은 1395년 태조 이성계에 의해서 새로운 조선왕조의 법궁으로 지어졌다. 경복궁은 동궐(창덕궁)이나 서궐(경희궁)에 비해 위치가 북쪽에 있어 ''북궐''이라 불리기도 했다. 경복궁은 5대 궁궐 가운데 으뜸의 규모와 건축미를 자랑한다. 경복궁 근정전에서 즉위식을 가진 왕들을 보면 제2대 정종, 제4대 세종, 제6대 단종, 제7대 세조, 제9대 성종, 제11대 중종, 제13대 명종 등이다. 경복궁은 임진왜란 때 상당수의 건물이 불타 없어진 아픔을 갖고 있으며, 고종 때에 흥선대원군의 주도 아래 7,700여칸에 이르는 건물들을 다시 세웠다. 그러나 또 다시 명성황후 시해사건이 일어나면서 왕조의 몰락과 함께 경복궁도 왕궁으로서의 기능을 상실하고 말았다. 경복궁에는 조선시대의 대표적인 건축물인 경회루와 향원정의 연못이 원형대로 남아 있으며, 근정전의 월대와 조각상들은 당시의 조각미술을 대표한다. 현재 흥례문 밖 서편에는 국립고궁 박물관이 위치하고 있고, 경복궁 내 향원정의 동편에는 국립민속 박물관이 위치하고 있다."
        };
        
        return (
    <div className="travel">
        <div className="travel_middle">
         <h3 className="t_h3">추천 여행지</h3>
            <div className="trends">
                <Swiper 
                spaceBetween={50}
                slidesPerView={4}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>
                         {/* <Link to={{
                             pathname: "../Detail", 
                            state:{
                            title: title,
                            name: name}
                            }}>  */}
                            <Link to = "../Detail" state={data1}>
                            <div className="trend">
                                <div className="t_image">
                                <img className="t_image" src={data1.picture} alt="Second slide"/>
                                </div>
                                <div clalssName="t_text">
                                    <h5 className ="tt2">{data1.location} {data1.name}</h5>
                                    {/* <Link to="../Header/Header">회원가입</Link> */}
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="trend">
                                <div className="t_image">
                                <img className="t_image" src="./image/gyeoungbuk.jpg" alt="Second slide"/>
                                </div>
                                <div clalssName="t_text">
                                    <h5 className ="tt2">서울 경복궁</h5>
                                </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="trend">
                                <div className="t_image">
                                <img className="t_image" src="./image/gyeoungbuk.jpg" alt="Second slide"/>
                                </div>
                                <div clalssName="t_text">
                                    <h5 className ="tt2">서울 경복궁</h5>   
                                </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="trend">
                                <div className="t_image">
                                <img className="t_image" src="./image/gyeoungbuk.jpg" alt="Second slide"/>
                                </div>
                                <div clalssName="t_text">
                                    <h5 className ="tt2">서울 경복궁</h5>
                                </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="trend">
                                <div className="t_image">
                                <img className="t_image" src="./image/gyeoungbuk.jpg" alt="Second slide"/>
                                </div>
                                <div clalssName="t_text">
                                    <span className ="tt2">서울</span>
                                    <span className ="tt2">경복궁</span>
                                </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div className="trend">
                                <div className="t_image">
                                <img className="t_image" src="./image/gyeoungbuk.jpg" alt="Second slide"/>
                                </div>
                                <div clalssName="t_text">
                                    <span className ="tt2">서울</span>
                                    <span className ="tt2">경복궁</span>
                                </div>
                        </div>
                    </SwiperSlide>

                   {/* <PrevButton  */}
                </Swiper>
            </div>
        </div>
    </div>
        )
    }
// }


class M_notice extends React.Component{
    render(){
        return (
            <div className="notice">
                <div >
                    <h5 className="notice1">공지사항</h5>
                    <Link to="../Notice">
                    <button className="notice2">
                        <AiOutlinePlus size="30"/></button>
                    </Link>
                </div>
                <ul>
                    <li><a href="#">sdaf</a></li><hr/>
                    <li><a>adf</a></li><hr/>
                    <li><a>asdfsf</a></li><hr/>
                    <li><a>wqeq</a></li><hr/>
                </ul>
            </div>
        )
    }
}


class Course extends React.Component{
    render(){
        return (
           < div className="location">
            <a>
               <img className="location_img" src ="./image/course.png"></img>
           </a>
       </div>
        )
    }
}

class Location extends React.Component{
    render(){
        return (
            <div className="location">
                 <a>
                    <img className="location_img" src ="./image/location.png"></img>
                </a>
            </div>
        )
    }
}

class Category extends React.Component{
    render(){
        return (
            <div className="location">
                 <a>
                    <img className="location_img" src ="./image/category.png"></img>
                </a>
            </div>
        )
    }
}


class Main extends React.Component{
    render(){
        return (
            <div className ="app_main">
                <Banner/> 
                <Trend/>
                <div className="NCLC">
                    <div className="NC">
                        <Location/>
                        <Course/>
                    </div>
                    <div className="NC">
                        <M_notice/>
                        <Category/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;