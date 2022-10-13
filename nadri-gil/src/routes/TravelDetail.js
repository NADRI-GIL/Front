import React, {useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AiOutlineHeart, AiFillStar, AiFillHeart, AiFillFilter} from 'react-icons/ai';
import {  BsCartPlus,BsCartPlusFill  } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import {getTravelDetail, postCart, getCart} from "../api.js";
import "./Main.css";
import mypic from './gyeoungbuk.jpg';


const { kakao } = window;

const Like =() =>{
  const location = useLocation();
  const state = location.state;

  const [like, setLike] = useState(true);

  const handleLike = () => {

      setLike(!like);
      if(like==false)
      {
        console.log(like);
      }
      else
      {
       console.log(like);
      }
  }

  return(
    <button className="button_user" onClick={handleLike}>
          {
            like ? (<AiOutlineHeart size="30" className="bookmarkFillIcon" /> ) : 
            ( <AiFillHeart size="30" color="red" className="bookmarkIcon" />)
        }
    </button>
  )
}

const Cart =() => {
  const location = useLocation();
  const state = location.state;
  const [cart, setCart] = useState(true);
  // const [userid, setUserid] = useState();

  const loginid = JSON.parse(localStorage.getItem("recoil-persist"));
  const {data } = useQuery('getCart',()=> getCart);
  console.log(data);

  const { mutate, isLoading } = useMutation(postCart, {
      onSuccess: data => {
        console.log(data);
        if(data.resultCode === 0){
          alert(data.resultMsg)
        }
        else{
          alert(data.resultMsg)
        }
      },
      onError: () => {
    
      },

    });
  
    const handleCart = () =>{
      console.log(cart);
      setCart(!cart);

      if (cart ==false)
      {
        console.log(cart);
      }
      else
      {
        console.log(loginid.loginId)
        console.log("loginId :" +loginid.loginId+"travelId :"+state.id);
        mutate({
          "loginId" : loginid.loginId,
          "travelId" : state.id
        })
    }
  }

    return (
      <button className='button_user' onClick={handleCart}>
            {
              cart ? (<BsCartPlus size="30" className="bookmarkFillIcon" /> ) : 
              ( <BsCartPlusFill size="30"  className="bookmarkIcon" />)
          }
      </button>
    )
}

function TravelUser() {
  const location = useLocation();
  const state = location.state;


  const {data } = useQuery('TravelDetail',()=> getTravelDetail(state.id))
  console.log(data);
  return(
  <div>
              {data?.data.list.map((e)=> {
          return( <div> 
         <div style={{textAlign: "center"}}>
                <h4>{e.name}</h4>
                <h6>{e.address}</h6>
                </div>
                  
               <div className="T_userbutton" >
               <div className="T_userbutton_2">
               <Like/>
               <h5>{e.likeCount}</h5>
               </div>
               <div>
               <Cart/>
                </div>
                </div>
         </div>  
          )
        })}
  </div>
  )
}

const TravelImage =(props)=>{
  const location = useLocation();
  const state = location.state;

  const {data } = useQuery('TravelDetail',()=> getTravelDetail(state.id))

        return(
            <div style={{textAlign:'center', justifiyCenter:"center", width:"100%", marign:"0 auto"}} >
{data?.data.list.map((e)=> {
          return(
               <img style={{textAlign: "center", width: "100%", height: "100%"}} src={e.image} alt={e.name}/>
               )
              })}
            </div>
        )
    }


const TravelDetail=()=>{
  const location = useLocation();
  const state = location.state;

  const {data } = useQuery('TravelDetail',()=> getTravelDetail(state.id))
        return(
            <div className="detail_component" >    
              
{data?.data.list.map((e)=> {
          return(<>
                <h5>상세정보</h5>
                <div ><h6>{e.info}</h6></div>
                </>)
        })}
            </div>
        )
    }

function Location() {
  const mapElement = useRef(null);
  const location = useLocation();
  const state = location.state;

  const {data } = useQuery('TravelDetail',()=> getTravelDetail(state.id))

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    data?.data.list.forEach((e) =>{
                  new naver.maps.Marker({
                      map: new naver.maps.Map(mapElement.current, naver.maps.MapOptions = {
                        center: new naver.maps.LatLng(e.latitude,e.longitude),
                        zoom: 14,
                        zoomControl: true,
                        zoomControlOptions: {
                          position: naver.maps.Position.TOP_RIGHT,
                        },
                      }),
                      position: new naver.maps.LatLng(e.latitude, e.longitude),
                  title:e.name,
                  });
              })
  }, []);

  return( <div  className="detail_component">
    {data?.data.list.map((e)=> {
          return(<>
                   <h6>주소</h6>
                <div ><h6>{e.address}</h6></div>
                </>)
        })}
    <div ref={mapElement} id ="map"style={{ minHeight: '400px' }} ></div></div>);
}

const TravelReview =()=>{

  const data = [
    {nikname:"dd", content:"좋아요~세계도시로 성장한 서울이 어떻게 탄생했으며 어떻게 변해서 오늘에 이르렀는지를 배우고 앞으로 어떻게 바뀔 것인지를 가늠해보는 곳이 서울역사박물관이다. 서울의 뿌리와 서울 사람의 생활, 현대 서울로의 변화를 보여주는 상설전시와 함께 서울의 역사·문화를 증언하는 다양한 기증유물이 전시되어 있다. 또한 어린이와 가족, 어른들을 위한 각종 체험교실과 문화행사들이 풍성하게 마련되어 있다."},
    {nikname:"dd", content:"좋아요~세계도시로 성장한 서울이 어떻게 탄생했으며 어떻게 변해서 오늘에 이르렀는지를 배우고 앞으로 어떻게 바뀔 것인지를 가늠해보는 곳이 서울역사박물관이다. 서울의 뿌리와 서울 사람의 생활, 현대 서울로의 변화를 보여주는 상설전시와 함께 서울의 역사·문화를 증언하는 다양한 기증유물이 전시되어 있다. 또한 어린이와 가족, 어른들을 위한 각종 체험교실과 문화행사들이 풍성하게 마련되어 있다."},
    
  ]
  return(
    <div className="detail_component">
      <h5>리뷰</h5>
      <div className="review">
        <button className='review_upload'>올리기</button>
      <input className="review_box" placeholder='리뷰를 남겨주세요' type="text"></input>
      </div>
      <div className="comment">
   {data.map((e)=> {
          return(<div className="comment_one">
                <h6>{e.nikname}</h6>
                <div className="comment_detail"><h6>{e.content}</h6><img src={mypic}></img></div>
                </div>)
        })}
    </div>
    </div>
  )
}

const Comment =() =>{
 const data = [
    {nikname:"dd", content:"좋아요~세계도시로 성장한 서울이 어떻게 탄생했으며 어떻게 변해서 오늘에 이르렀는지를 배우고 앞으로 어떻게 바뀔 것인지를 가늠해보는 곳이 서울역사박물관이다. 서울의 뿌리와 서울 사람의 생활, 현대 서울로의 변화를 보여주는 상설전시와 함께 서울의 역사·문화를 증언하는 다양한 기증유물이 전시되어 있다. 또한 어린이와 가족, 어른들을 위한 각종 체험교실과 문화행사들이 풍성하게 마련되어 있다."},
    {nikname:"dd", content:"좋아요~세계도시로 성장한 서울이 어떻게 탄생했으며 어떻게 변해서 오늘에 이르렀는지를 배우고 앞으로 어떻게 바뀔 것인지를 가늠해보는 곳이 서울역사박물관이다. 서울의 뿌리와 서울 사람의 생활, 현대 서울로의 변화를 보여주는 상설전시와 함께 서울의 역사·문화를 증언하는 다양한 기증유물이 전시되어 있다. 또한 어린이와 가족, 어른들을 위한 각종 체험교실과 문화행사들이 풍성하게 마련되어 있다."},
    
  ]
  return(
    <div className="comment">
   {data.map((e)=> {
          return(<div className="comment_one">
                <h6>{e.nikname}</h6>
                <div className="comment_detail"><h6>{e.content}</h6><img src={mypic}></img></div>
                </div>)
        })}
    </div>
  )
}
  const obj = {
    0: <TravelDetail />,
    1: <Location />,
    2: <TravelReview />,
  }

class A extends React.Component{
 state = {
    activeId: 0
  }

  clickHandler = (id) => {
    this.setState({ activeId: id })
  }
  render(){
    return(
    <div> <hr></hr>
      <ul className="tabs">
        <li className={`${this.state.activeId === 0? 'active': ''}`} onClick={() => this.clickHandler(0)}>상세정보</li>
        <li className={`${this.state.activeId === 1? 'active': ''}`} onClick={() => this.clickHandler(1)}>오시는 길</li>
        <li className={`${this.state.activeId === 2? 'active': ''}`} onClick={() => this.clickHandler(2)}>리뷰</li>
      </ul>
        <div>{obj[this.state.activeId]}</div>
      </div>
     );
    }
}


class Detail extends React.Component{
    render(){
        return (
      <div className="detail">
        <TravelUser/>
        <hr></hr>
        <TravelImage/>
        <hr></hr>
       <TravelDetail/>
       <hr></hr>
       <Location/>
       <hr></hr>
       <TravelReview/>
  
      {/* <A/> */}
      </div>
        );
    }
}

export default Detail;