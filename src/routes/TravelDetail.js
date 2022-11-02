import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineHeart, AiFillStar, AiFillHeart, AiFillFilter } from 'react-icons/ai';
import { RiRoadMapLine, RiRoadMapFill } from "react-icons/ri";
import { QueryClient, useMutation, useQuery } from "react-query";
import { getTravelDetail, postCart,getHeart, postHeart } from "../api.js";
import "./Main.css";
import styled from "styled-components";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Container = styled.div`
width: 50%;
margin: 0 auto;
font-family: 'SUIT';
@media screen and (max-width: 900px) {
width: 100%;
}
`;

const Content = styled.div`
// height:25vh;
padding:5px;

    img{
        width:100%;
        object-fit: cover;
        height: 100%;

    }
    a{
        text-decoration: none;
        color:black;
    }
    p{
        font-family: 'SUIT';
        font-size:0.8vw;
        margin-top:1vh;
    }
`;
const User = styled.div`  
text-align:center;
    div{
      display: flex;
      justify-content: space-between;
    }

    button{
    background-color: transparent;
    border: 0;
    }

`;
const Image = styled.h4`
font-family: 'SUIT';
`
const TravelDetail = styled.div`

font-family: 'SUIT';
        font-size:0.6vw;
        margin:auto;

        h5{g
          font-weight: bolder;
        }
`
const Location = styled.div`
    width:100%;
    margin-bottom:3vh;
    
    h5{
      font-weight: bolder;
    }
`;

const Review = styled.div`
    div{
      position: relative !important;
    }
    input{
      margin: 10px auto; 
      border: none;
      background-color :rgb(240, 237, 237);
      border-radius: 10px;
      width: 100%;
      height: 70px;
    }
    button{
      position: absolute;
      right: 15px;
      font-size: 15px;
      top: 30px;
      margin: 0 auto;
      border: 0;
      background-color: transparent;
    }
    
    h5{
      font-weight: bolder;
    }
`
const StarContainer = styled.div`
  border: none;
  background-color: white;
`

const HiddenReview = styled.div`
${({ show }) => (show ? `display:block` : `display: none`)}
`
const Hr = styled.hr`
border: 0;
height: 1px;
margin: 1vh 0 1vh 0;  
background-color: #595959;
`

const { kakao } = window;
const loginid = JSON.parse(localStorage.getItem("recoil-persist"));

function Detail(){
    let {id} = useParams();
    const loginid = JSON.parse(localStorage.getItem("recoil-persist"));

    const { data } = useQuery('TravelDetail', () => getTravelDetail(id), {
        cacheTime: Infinity,
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: 0,
            onSuccess: data => {
                console.log(data);
            },
      })

    useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    data?.data.list.forEach((e) => {
        new naver.maps.Marker({
        map: new naver.maps.Map(mapElement.current, naver.maps.MapOptions = {
            center: new naver.maps.LatLng(e.latitude, e.longitude),
            zoom: 14,
            zoomControl: true,
            zoomControlOptions: {
            position: naver.maps.Position.TOP_RIGHT,
            },
        }),
        position: new naver.maps.LatLng(e.latitude, e.longitude),
        title: e.name,
        });
    })
    }, [data]);

    const mapElement = useRef(null);

    // 좋아요
    const Like = () => {
        const [like, setLike] = useState(true);
      
        const handleLike = () => {
            likepost.mutate({
              "loginId": loginid.loginId,
              "travelId": id})
        }
        const likepost = useMutation(postHeart, {
          onSuccess: data => {
              console.log(data);
              if (data.resultCode == 0 && like==false) {
                  setLike(true);
                  alert(data.resultMsg);
                 
              }
              else {
                  alert(data.resultMsg)
                  setLike(false);
              }
          },
        });
   
        const likemutation = useMutation(getHeart, {
          onSuccess: data => {
              console.log(data);
              if (data.resultCode == 0) {
                  // setLike(true);
                  for (let i = 0; i<data.list.length; i++)
                  {
                    if(data.list[i].travelId == id)
                    {
                      setLike(false);
                      break;
                    }
                  }
              }
          },
      });

      useEffect(()=>{
          likemutation.mutate({
            "loginId": loginid.loginId,
            "travelId": id})
      }, [])

        return (
          <button onClick={handleLike}>
            {
              like ? (<AiOutlineHeart size="30" className="bookmarkFillIcon" />) :
                (<AiFillHeart size="30" color="red" className="bookmarkIcon" />)
            }
          </button>
        )
      }

    // 장바구니
    const Cart = () => {
        const [cart, setCart] = useState(true);
    
        const { mutate, isLoading } = useMutation(postCart, {
          onSuccess: data => {
            if (data.resultCode === 0) {
              alert(data.resultMsg)
            }
            else {
              alert(data.resultMsg)
            }
          },  
        });
    
        const handleCart = () => {
          if (cart == false) {
            console.log(cart);
          }
          else {
         mutate({
              "loginId": loginid.loginId,
              "travelId": id
            })
          }
        }
        return (
          <button onClick={handleCart}>
            {
              cart ? (<RiRoadMapLine size="30" className="bookmarkFillIcon" />) :
                (<RiRoadMapFill size="30" className="bookmarkIcon" />)
            }
          </button>
        )
      }

      const [hovered, setHovered] = useState(null);
      const [clicked, setClicked] = useState(null);
      
    return(
        <Container>
                    {data?.data.list.map((e) => {
          return (
            <Content>
                <User>
                    <h4>{e.name}</h4> <h6>{e.address}</h6>
                    <div>
                      <div><Like /> <h5>{e.likeCount}</h5></div>
                      <Cart />
                    </div>
                </User>
                <Hr/>
                <Image>
                    <img src={e.image} alt={e.name} />
                </Image>
                <Hr/>
                <TravelDetail>
                    <h5>상세정보</h5>
                    <div ><h6>{e.info}</h6></div>
                </TravelDetail>
                <Hr/>
                <Location>
                  <h5>오시는 길</h5>
                    <div style={{display:'flex', marginRight: '10px'}}> <h6>주소 : {e.address}</h6></div>
                    <div ref={mapElement} id="map" style={{ minHeight: '400px', width:"100%" }} ></div>
                </Location>
                <Hr/>
                <Review>
                <h5>리뷰</h5>
                <StarContainer>
              {[1, 2, 3, 4, 5].map(el => (
                <FontAwesomeIcon  icon ={faStar}  size="2x" style={{color:(clicked>=el | hovered >=el) ? '#ffda38':'#b9b9b9'}}  
                  key={el}
                  onMouseEnter={() => setHovered(el)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setClicked(el)} 
                />
              ))}
            </StarContainer>
            {[1, 2, 3, 4, 5].map(num => ( <HiddenReview key={num} show={clicked === num}>
                    <button>올리기</button>
                    <input placeholder='리뷰를 남겨주세요' type="text"></input>
                    </HiddenReview>
                    ))}
                </Review>
            </Content>
            )
        })}
        </Container>
    )
}

export default Detail;