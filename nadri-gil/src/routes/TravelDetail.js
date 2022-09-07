import { render } from '@testing-library/react';
import React, {useContext, useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AiOutlineHeart, AiFillStar, AiFillHeart } from 'react-icons/ai';
import { useMutation } from "react-query";

const { kakao } = window;

const TravelUser = () => {
    const location = useLocation();
    const state = location.state;
    console.log(state);

    let[count , setCount] = useState(0);        
    const [like, setLike] = useState(true);
    
    const UsepostModify = async (data) => {
        return fetch(`http://43.200.49.4:8080/travels/${state.id}/edit`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json());
      }
    
    const { mutate, isLoading } = useMutation(UsepostModify, {
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
          alert("there was an error")
        }

      });
    

      const handleLike = () => {

          setLike(!like);


          if(like==false)
          {
            count=state.likeCount - 1;
              setCount(count);
            console.log(state.likeCount)
            }
          else
          {
            state.likeCount=state.likeCount + 1;
            console.log("count"+count);
            setCount(state.likeCount);
        
              mutate(
                  {
                    "id" : 1,
                    "image": "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=b62a331e-2806-4d2d-95ea-1c2814beba30",
                    "name":"우암사적공원",
                    "location": "대전 동구" ,
                    "address": "대전광역시 동구 충정로 53",
                    "likeCount": 0,
                    "info" : "우암사적공원은 조선 후기 대유학자인 우암 송시열(1607~1689) 선생이 학문을 닦던 곳으로 1991년부터 1997년까지 1만 6천여 평에 장판각, 유물관, 서원 등의 건물을 재현해 1998년 4월 17일 사적공원으로 새롭게 탄생했다. 이곳은 선생이 말년에 제자를 가르치고 학문에 정진하던 남간정사, 건축미가 뛰어난 기국정, 송시열 문집인 송자대전판 등 역사적으로 중요한 문화재가 보전되어 있을 뿐만 아니라 공원 곳곳이 잘 단장되어 있어 도심 속 시민들의 쉼터로도 제격이다. 사적공원 안으로 들어서면 맨 먼저 왼쪽으로 대전시 유형문화재로 지정되어 있는 남간정사와 기국정 건물이 자리하고 있다. 남간정사를 살펴보고 나와 좀 더 위쪽으로 올라가면 우암선생의 유물과 일생을 살펴볼 수 있는 유물관이 있고, 유물관 앞 홍살문 사이로 멀리 명정문(明正門)이 보인다. 조선시대 서원의 형태를 재현해 놓은 곳이다.서원 안으로 들어서면 우측에는 모든 괴로움을 참아야 한다는 뜻의 인함각(忍含閣), 좌측에는 모든 일을 명확하게 하고 마음을 맑게 하라는 뜻을 담은 명숙각(明淑閣), 정면에는 마음을 곧게 쓰라는 뜻의 강당인 이직당(以直堂)이 자리를 하고 있다. 그 뒤로 매사 심사숙고하여 결정하라는 뜻의 심결재(審決齋)와 선현의 가르침을 굳게 지키라는 견뢰재(堅牢齋)가 있으며, 가장 높은 곳에 새로 옮겨 지은 남간사가 자리잡고 있다. 다시 명정문을 나와 우측으로 돌아가면 연못과 덕포루(德布樓)가 한 폭의 그림같이 펼쳐진다. 덕포루와 더불어 고즈넉한 연못이 운치를 한층 더한다. 감탄사가 절로 나오는 근사한 풍광에 다시 한번 마음의 경계가 풀린다. 한편 사적공원 내에는 봄, 가을 우암 선생의 제향 봉행이 이루어지고 있다. 조선 후기 이 땅에 유교사상을 꽃피운 우암 송시열 선생의 뜻을 기리고 보존하기 위해 조성된 우암사적공원. 대학자 우암의 숨결을 느낄 수 있을 것이다.",
                    "latitude":36.34793488652079 ,
                    "longitude":127.4581788566933  ,
                    "category": "관광지"
                  }
              )
          console.log(state.likeCount)
                }
        }
    
      return(
          <div className="T_user" style={{textAlign :"center"}}>
              {state && (
                <>
                <div style={{textAlign: "center"}}>
              <h2>{state.name}</h2>
              <h4>{state.address}</h4>
              </div>
               
              <div className="T_userbutton" >
  
              <button className="button_user" onClick={handleLike}>
                  {
                      like ? (<AiOutlineHeart size="30" color="red" className="bookmarkFillIcon" /> ) : 
                      ( <AiFillHeart size="30" color="red" className="bookmarkIcon" />)
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
            <div style={{textAlign:'center', justifiyCenter:"center", width:"100%", marign:"0 auto"}} >
               <img style={{textAlign: "center", width: "1000px", height: "500px"}} src={state.image} alt={state.name}/>
            </div>
        )
    }


const TravelDetail=()=>{
  const location = useLocation();
  const state = location.state;
  console.log(state);
        return(
            <div style={{ marginLeft : "200px", marginRight:"200px"}} >
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
        return (
            <div style={{ height: "500px", marignLeft:"200px"}}>
            <div id="map" style={{width:"80%", height:"400px", margin :"0 auto"}}></div>
            
            </div>
        )
    }

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
          <div style={{widht:"80%", height:"300px", margin: "0 auto"}}>
            <input className="review" value={input} onChange={onChange}></input>
            <button className="r_button"  variant="primary" type="submit"  onClick={() => {
                addComment(input);
                setInput("");
              }} >등록</button>
    
            {comments.map((comment, index) => (
              <div >
                <div>
                  <p>{comment.userName}</p>
                  <div>
                  <button onClick={() => removeComment(comment.id)}>삭제</button>
                  <button onClick={() => chagneContent(comment.id, input)}>수정</button>
                  </div>
                </div>
                내용: {comment.content}
              </div>
            ))}
          </div>
        );
      };
    
    
    class TravelReview extends React.Component{
        render(){
            return(
                <div>
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
            <div style={{widht:"80%", height:"300px", margin: "0 auto"}}>
            <div  >
        <TravelUser/>
        <TravelImage/>
       <TravelDetail/>
       <Location/>
       <TravelReview/>
       </div>
       </div>
        );
    }
}

export default Detail;