/*global kakao*/ 

import { render } from '@testing-library/react';
import React, {useContext, useState, useEffect, useRef } from 'react';
import Button from "react-bootstrap/Button";
import { useLocation, Link } from 'react-router-dom';
// import { useSelector,shallowEqual } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row, Container, useAccordionButton } from 'react-bootstrap';

const { kakao } = window;

const TravelUser = () => {
    const location = useLocation();
    const state = location.state;
    console.log(state);
  
      const[count , setCount] = useState(0);        
      const [like, setLike] = useState(true);
  
      const handleLike = () => {
          setLike(!like);
          if(like==false)
          {
              setCount(count-1);  
          }
          else
          {
              setCount(count+1);
          }
      };
  
      return(
          <div className="T_user">
              {state && (
                <>
                <div >
              <h2>{state.name}</h2>
              <h4>{state.address}</h4>
              </div>
               
              <div className="T_userbutton" >
  
              <button className="button_user" onClick={handleLike}>
                  {
                    //   like ? (<AiOutlineHeart size="30" color="red" className="bookmarkFillIcon" /> ) : 
                    //   ( <AiFillHeart size="30" color="red" className="bookmarkIcon" />)
                  }
              </button>
              <span>{state.likeCount}</span>
              <button ></button>
              <span>4.5</span>
              <button></button>
              </div>
             </>
              )}
          </div>
      )
  }

const TravelImage =(props)=>{
  const location = useLocation();
  const state = location.state;
  console.log(state);

        return(
            <div >
               <img src={state.image} alt={state.name}/>
            </div>
        )
    }


const TravelDetail=()=>{
  const location = useLocation();
  const state = location.state;
  console.log(state);
        return(
            <div >
                <h3>상세정보</h3>
                <div ><h5>{state.info}</h5></div>
            </div>
        )
    }

const Location=()=>{
    const location = useLocation();
    const state = location.state;

    const lat = state.latitude;
    const lng = state.longitude;

    console.log(lat, lng);
    useEffect(()=>{
        var container = document.getElementById('map');
      
        var options = {
        center: new kakao.maps.LatLng(lat,lng),
        level: 3
        };
    
        var map = new kakao.maps.Map(container, options);
        var markerPosition  = new kakao.maps.LatLng(lat, lng); 
        var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);
    
        }, [])
        // const center = kakaoMap.getCenter();
    
        return (
            <div>
            <div id="map" style={{width:"500px", height:"400px"}}></div>
            
            </div>
        )
    }



class TravelReview extends React.Component{
    render(){
        return(
            <div >
                <h3>리뷰</h3>
                <div>
                    {/* <Comment/> */}
                </div>
            </div>
        )
    }
}

class Detail extends React.Component{
    render(){
        return (
            <div >
            <div >
        <TravelUser/>
        <TravelImage/>
       <TravelDetail/>
       <Location/>
       </div>
       </div>
        );
    }
}

export default Detail;