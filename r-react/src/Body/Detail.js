/*global kakao*/ 

import { render } from '@testing-library/react';
import React, {useContext, useState, useEffect, useRef } from 'react';
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { useLocation, Link } from 'react-router-dom';
import './Detail.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row, Container } from 'react-bootstrap';
import {AiOutlineHeart, AiFillStar, AiFillHeart } from 'react-icons/ai';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';
// import { RiHeartAddLine } from 'react-icons/ri';
// import { UserContext } from "./comment.test.js";

const { kakao } = window;

//  function TravelUser(props) {
  const TravelUser = (props) => {
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
              <div>
            <h2>{state.name}</h2>
            <h4>{state.location}</h4>
            </div>
            )}
            <div className="T_userbutton" >

            <button className="button_user" onClick={handleLike}>
                {
                    like ? (<AiOutlineHeart size="30" color="red" className="bookmarkFillIcon" /> ) : 
                    ( <AiFillHeart size="30" color="red" className="bookmarkIcon" />)
                }
            </button>
            <span>{count}</span>
            <button className="button_user"><AiFillStar size="30" color="#F1F738"/></button>
            <span>4.5</span>
            <button className="button_user"><BsFillBookmarkPlusFill size="30"/></button>
            {/* <RiHeartAddLine size ="30"/> */}
            </div>
        </div>
    )
}


const TravelImage =(props)=>{
  const location = useLocation();
  const state = location.state;
  console.log(state);

        return(
            <div className="T_image">
               <img src={state.picture} alt="Second slide"/>
            </div>
        )
        
    }



const TravelDetail=(props)=>{
  const location = useLocation();
  const state = location.state;
  console.log(state);
        return(
            <div className="T_detail">
                <h3>상세정보</h3>
                <div className="T_detail_txt"><h5>{state.detail}</h5></div>
            </div>
        )
    }



const Map = () => {

  useEffect(() => {
    var container = document.getElementById("map");

    var options = {
      center: new window.kakao.maps.LatLng(37.57758625666001, 126.9768888201249),
      level: 3
    };

    var map = new window.kakao.maps.Map(container, options);

    map.setDraggable(false);
//줌 막기
map.setZoomable(false);
    var markerPosition  = new kakao.maps.LatLng(37.57758625666001, 126.9768888201249); 
    var marker = new kakao.maps.Marker({
      position: markerPosition
  });
  marker.setMap(map);

    
  }, []);

  return (
        <div className="T_map">
          <h3>찾아오시는 길</h3>
             <div id ="map" className="map"></div>
        </div>
  );
};

const CommentWrapper = styled.div`
  // border: 1px solid black;
    width: 80%; 
    margin: 0 auto;
    height: 100px;
    text-align: left;
  p{
    margin: 0;
  }
`;

const UserInfoWrapper = styled.div`
    display: flex;
   justify-content: space-between;
   border-bottom: 1px solid #eeeeee;
//   border: none;
`;

const button = styled.button`
  border: 0;
  height: 20px;
  background: none;
`

const Comment = () => {
    const [input, setInput] = useState();
    // const { userData } = useContext(UserContext);
    const [comments, setComments] = useState([]);

    const onChange = (e) => {
      setInput(e.target.value);
    };
  
    const addComment = () => { // 코멘트 추가
      setComments(
        comments.concat({
          id: 1, //comments.length + 1,
          content: input,
          userName: "이름"  // userData[0].id,
        })
      );
 
      setInput("");
    };
  
    const removeComment = (id) => { // 코멘트 삭제
      return setComments(comments.filter((comment) => comment.id !== id));
    };
  
    const chagneContent = (id, inputWord) => { // 코멘트 수정
      return setComments(comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            content: inputWord,
          };
        }
        return comment;
      }));
    };
  
    return (
      <div>
        <input className="review" value={input} onChange={onChange}></input>
        <Button className="r_button"  variant="primary" type="submit"  onClick={() => {
            addComment(input);
            setInput("");
          }} >등록</Button>

        {comments.map((comment, index) => (
          <CommentWrapper >
            <UserInfoWrapper>
              <p>{comment.userName}</p>
              <div>
              <button onClick={() => removeComment(comment.id)}>삭제</button>
              <button onClick={() => chagneContent(comment.id, input)}>수정</button>
              </div>
            </UserInfoWrapper>
            내용: {comment.content}
          </CommentWrapper>
        ))}
      </div>
    );
  };


class TravelReview extends React.Component{
    render(){
        return(
            <div className="T_review">
                <h3>리뷰</h3>
                <div className="all_review">
                    <Comment/>
                </div>
            </div>
        )
    }
}

class Detail extends React.Component{
    render(){
        return (
            <div className="app_detail_bf">
            <div className="app_detail">
        <TravelUser/>
        <TravelImage/>
        {/* </div> */}
       <TravelDetail/>
       <Map/>
       <TravelReview/>
       </div>
       </div>
        );
    }
}

export default Detail;