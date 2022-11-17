import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineHeart, AiOutlineEdit, AiFillStar, AiFillHeart, AiFillFilter, AiOutlineConsoleSql } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { RiRoadMapLine, RiRoadMapFill } from "react-icons/ri";
import { Mutation, QueryClient, useMutation, useQuery } from "react-query";
import { getTravelDetail,getTravelReview,updateReview, postCart, getRecommend,getHeart, deleteReview, postHeart, postReview, getInfo } from "../api.js";
import "./Main.css";
import styled from "styled-components";
import { faStar , faQuoteLeft, faQuoteRight, faPencilSquare,faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loginIdAtom } from "../atom.js"
import { constSelector, useRecoilValue } from "recoil";
import axios from 'axios';
import { SlArrowRight,SlArrowLeft } from 'react-icons/sl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';

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

        h5{
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
  text-align: center;
  justify-content: center;
  display: flex;
`

const HiddenReview = styled.div`
${({ show }) => (show ? `display:block` : `display: none`)}
display: flex;

`
const Hr = styled.hr`
border: 0;
height: 1px;
margin: 1vh 0 1vh 0;  
background-color: #595959;
`
const Edit = styled.div`
  text-align : right;

  button{
  position :initial;

  border: 0;
  background-color : transparent;
  }
`

const Comment = styled.div`
min-height: 100px;
    div{
      display : flex;
      justify-content: space-between;
      
      h6{
        margin-right: 20px;
      }

      button{
        border: 0;
      background-color: transparent;
      }
    }

  
`
const NextButton = styled.button`
padding: 0;
background: none;
border:none;

`
const PrevButton = styled.button`
padding: 0;
background: none;
border:none;`

const DeleteImage = styled.div`
position:absolute;
left:5%;
top: 2%;
background-color:#ffffffb5;
border-radius:40%;
padding:0.3vw;
`

const { kakao } = window;

function Detail(){
    let {id} = useParams();
    const loginId = useRecoilValue(loginIdAtom);
    const [likeCount, setLikeCount] = useState(0);
    const [reviewss, setReviewss] = useState(false);
    const [num, setNum] = useState(0);
    const [revid , setReviewId] = useState(0);

    let writeCheck = false;
    // let num = 0;
    
    const {data:res} = useQuery(['userInfo', loginId], () => getInfo(loginId), {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: res => {
        console.log(res);
        console.log(res.list[0].nickname);
      },
      onError: () =>{
   
      }
  })

  const { refetch :recrefetch , data: recommend } = useQuery(['Recommend', loginId],()=> getRecommend(loginId),{
 
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: data => {
      // 성공시 호출
      console.log(data);
    }

  });

  const { data:travelall } = useQuery(['TravelDetail', id], () => getTravelDetail(id), {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: data => {
          console.log(data);
          setLikeCount(data.list[0].likeCount);
          console.log(likeCount);
          // setReviewss(data.list[0].reviews);
          // console.log(reviewss);
          // ReviewCheck();
      },
    })

    const { refetch:reviewrefetch, data:travelreview } = useQuery(['TravelReview', id], () => getTravelReview(id), {
      // cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: data => {
        console.log(data);
        console.log("SDfd");
        setTimeout(ReviewCheck(data), 1000);
        
    
        // console.log(travelreview);
      },
      // onSuccess: refetch => {
      //   console.log("refetch");
      // },
    })

    const updatereview = useMutation(updateReview, {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: data => {
          console.log(data);
          reviewrefetch();
          setEditReview(false);
      },
  });

  const deletereview = useMutation(deleteReview, {
    cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: data => {
        console.log(data);
        reviewrefetch();
    },
    onError: error =>{
      console.log("d");
    }
});


    const ReviewCheck= (e) =>{

     console.log("1체크", travelreview);
     setTimeout(1000);
    //  console.log(e.list.length);
      for (let i = 0; i < e.list.length;  i++)
      {
        console.log("2체크");

        if(e.list[i].nickname == res.list[0].nickname)
        { 
          writeCheck = true;
          console.log("writecheck",writeCheck);
          setReviewss(writeCheck);
          setNum(i);
          setReviewId(e.list[i].id);
          console.log("ss1", reviewss);
          return true;
        }
      }
      return null;
        
    }
    useEffect(()=>{
      if(loginId != '' && travelreview!==undefined) setReviewss(ReviewCheck(travelreview));
    }, [travelreview])
      
    const [like, setLike] = useState(true);

    // if(loginId != '')
    // setReviewss(ReviewCheck(travelreview));
    const {mutate:likemutation} = useMutation(['getHeart', loginId],getHeart, {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: data => {
          console.log(data);
         
              // setLike(true);
              for (let i = 0; i<data.list.length; i++)
              {
                if(data.list[i].travelId == id)
                {
                  setLike(false);
                  break;
                }
              }
          
      },
  });

  useEffect(()=>{
    if(loginId != null)
     { likemutation({
        "loginId": loginId,
     "travelId": id})
     }
  }, [likemutation])

    useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    
    travelall?.list.forEach((e) => {
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
    }, [travelall]);

    const mapElement = useRef(null);

    // 좋아요
    const Like = () => {
        // const [like, setLike] = useState(true);
      
        const handleLike = () => {
            likepost.mutate({
              "loginId":loginId,
              "travelId": id})
        }

        const likepost = useMutation(postHeart, {
          onSuccess: data => {
              console.log(data);
              if (data.resultCode == 0 && like==false) {
                  setLike(true);
                  alert(data.resultMsg);
                  setLikeCount(likeCount-1);
                  recrefetch();
              }
              else if(data.resultCode == -1){
                  alert(data.resultMsg)
                  setLike(true);
              }
              else {
                alert(data.resultMsg)
                setLike(false);
                console.log(like);
                setLikeCount(likeCount+1);
                recrefetch();
              }
          },
        });
   

        return (
          <div><button onClick={handleLike}>
            {
              like ? (<AiOutlineHeart size="30" className="bookmarkFillIcon" />) :
                (<AiFillHeart size="30" color="red" className="bookmarkIcon" />)
            }
          </button></div>
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
              "loginId": loginId,
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

      //리뷰
      const [hovered, setHovered] = useState(null);
      const [clicked, setClicked] = useState(null);
      const [comment, setComment] = useState('');
      const [img, setImg] = useState('');
      const [editreview, setEditReview] = useState(false);      

      const uploadProfile = (e) =>{
        setComment(e.target.value);
        const img = e.target.files[0];
        const formData = new FormData();

        formData.append('s3upload', img);
        console.log(formData);

    axios.post(`http://13.124.150.86:8080/upload`,
    formData,{
      headers:{
        "Content-Type": "multipart/form-data",
      }
    }).then(function(response){
      console.log(response);
      setImg(response.data.list[0]);
      console.log(img);
      setComment('');
   
    })
      .catch(err=>{
        console.log(err);
      });
   }

   //리뷰 보내기

   const [review, setReview] = useState("")
   const [check, setCheck] = useState(false);

   const reviewmutation = useMutation(postReview, {
    onSuccess: data => {
      if (data.resultCode === 0) {
        alert(data.resultMsg)
        console.log(img);
        reviewrefetch();
        setTimeout(ReviewCheck(travelreview), 3000);
        setCheck(true);
      }
      else {
        alert(data.resultMsg)
      }
    },  
  });
   
   const onReviewHandler = (event) => {
    setReview(event.currentTarget.value)
}

const onClickReview = event => {
  
  if(clicked==null && editreview ==false)
  {
    alert("별점을 입력해주세요");
  }
  else{
    console.log(loginId, id, clicked,review, img)

    if(editreview ==true)
    {
      // updateReview(revid);
      console.log('ss', review,img )
      updatereview.mutate([revid, {
        "content" : review,
        "image" : img
    }])
    // reviewrefetch();
  }
    else{
      reviewmutation.mutate({
      "loginId":loginId,
      "travelId": id,
      "star" : clicked,
      "content" : review,
      "image" : img
    })
  }
  }
}

const EditReview = () =>{
  setEditReview(true);
  console.log("editreview")
}
const DeleteReview = () =>{
  // deleteReview(revid);
  deletereview.mutate(revid);
  setReviewss(false);
  // reviewrefetch();
  
}
const prevRef = useRef(null);
const nextRef = useRef(null);
const {  slidesPerView } = 4;
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


    return(
        <Container>
                    {travelall?.list.map((e) => {
          return (
            <Content>
                <User>
                <div style={{justifyContent:"center"}}><FontAwesomeIcon icon ={faQuoteLeft} />  <h4 style={{background: "linear-gradient(to top, rgb(255 250 3) 50%, transparent 50%)"}}>
                  {e.name}</h4><FontAwesomeIcon icon ={faQuoteRight} /></div> 
                 <h6>{e.address}</h6>
                    <div>
                      <div><Like /> <h5>{likeCount}</h5></div>
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
                {/* <Hr/> */}
                <h5 style={{margin:"20px 0"}}><b>{e.name}</b> 비슷한 여행지 추천</h5>
                <div style={{display:"flex" , margin:"20px 0",  borderRadius: "10px"}}>
              <PrevButton ref={prevRef}><SlArrowLeft size="20"/></PrevButton>
              {swiperSetting && (  <Swiper {...swiperSetting}>
                {
                e.recommendTravels.map((e)=> {
                return( <SwiperSlide >
                  <Link  to = {`/TravelDetail/${e.id}`}state={e} style={{ width:"25vh",color:"black"}}>
                      <div style={{ width:"24vh", textAlign:"center"}}>
                        {/* <div><h7 style={{background: "linear-gradient(to top, rgb(255 250 3) 50%, transparent 50%)"}}>19% 일치</h7></div> */}
                        <DeleteImage>
                        <div style={{ cursor: 'pointer' , fontSize:"small"}} ><h7>{e.similarity} %</h7></div>
                        </DeleteImage>
                        <div><img style={{width:"170px",overflow:"hidden",objectFit:"cover", height:"150px", borderRadius: "10px"}} src={e.image}></img></div>
                        <div style={{textAlign:"center"}}><h7>{e.location} {e.name} </h7></div>
                      </div>
                  </Link>
              </SwiperSlide>
                )
              })}
            </Swiper>
              )}          
              <NextButton ref={nextRef}><SlArrowRight size="20" /> </NextButton>
          </div>
          <Hr/>
                <Review>
                <h5>리뷰</h5>
       {(reviewss == true)&&(editreview == false) ?  //해당 여행지에 대해 리뷰를 썼는가
       (<>
       <StarContainer>{[1, 2, 3, 4, 5].map(el => (
          <FontAwesomeIcon  icon ={faStar}  size="2x" style={{color:el <= travelreview.list[num].star ? '#ffda38':'#b9b9b9'}}/>))}
          <h3 style={{marginLeft:"10px"}}><b>{e.reviewTotal.toFixed(1)}/5.0</b></h3></StarContainer>
          <Edit style={{justifyContent:"right"}}>
         <button onClick={()=>{EditReview()}}><AiOutlineEdit size="20"  /></button>
         <button  onClick={()=>{DeleteReview()}}><BsTrash size="20" /></button>
          </Edit>
          <div style ={{textAlign:"center", display:"flex"}}>
          {travelreview.list[num].image != '' ?  <img  style ={{width:"20%"}} src={travelreview.list[num].image}/>: ''}              
          <div style={{width:(travelreview.list[num].image != '') ? '80%': '100%',marginLeft:"20px", minHeight:"70px", backgroundColor:"#f4f2f2", borderRadius:"20px",padding : "20px", justifyContent: "right"}}>
              <h6 style={{position:"absolute", top:"50%", padding:"0 20px",transform:"translateY(-50%)"}}>{travelreview.list[num].content}</h6>
            </div>
          </div>
       </>)
       :  //writecheck
       (
       <> 
       <StarContainer> {[1, 2, 3, 4, 5].map(el => (<>
        {editreview ==true ?  <FontAwesomeIcon  icon ={faStar}  size="2x" style={{color:el <= travelreview.list[num].star ? '#ffda38':'#b9b9b9'}}/> : <FontAwesomeIcon  icon ={faStar}  size="2x" style={{color:(clicked>=el | hovered >=el) ? '#ffda38':'#b9b9b9'}}  
          key={el}
          onMouseEnter={() => setHovered(el)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setClicked(el)} 
        />}</>))}
        <h3 style={{marginLeft:"10px"}}><b>{e.reviewTotal.toFixed(1)}/5.0</b></h3>
      </StarContainer>
      <HiddenReview style={{display:"flex"}} show={clicked !=null}>
        <div style={{textAlign:"center", width:"20%"}}>
          {img ===''?   <label style={{position:"absolute", top:"50%", transform:"translateY(-50%)"}} for = "fileupload">사진 추가하기</label>
          :  <div style={{display:"block"}}><img style={{width:"80%"}} src={img} /><label style={{}} for = "fileupload">사진 수정하기</label></div>}
          <input style={{height:"0px", visibility:"hidden"}} enctype="multipart/form-data"  onChange ={uploadProfile} type='file' value={comment} accept='image/*' id = 'fileupload' name = 'file' />
        </div>
        <div style={{width:"80%", height:"fit-content"}}> 
          <button onClick={()=>{onClickReview()}}>올리기</button>
          <input  placeholder='리뷰를 남겨주세요' type="text"  onChange={onReviewHandler} value={review}></input>
        </div>             
      </HiddenReview></> )
     }
  </Review>

        {travelreview?.list.slice(0).reverse().map((d) => {
          return(<> <Hr/>
        <Comment >
          <div>
            <div style={{padding : " 5px 5px"}}>
              <h6>{d.nickname}</h6>
              <h6>{[1, 2, 3, 4, 5].map(el => (
                <FontAwesomeIcon  icon ={faStar} style={{color:el <= d.star ? '#ffda38':'#b9b9b9'}}/>
              ))}</h6>
              <h6>{d.createdDate}</h6>
              </div>
          </div>
          <div style ={{display: "flex" , padding : "5px 20px"}}>
              <h6 style={{width:"75%"}}>{d.content}</h6>
             {d.image === ''?'':<img style ={{ justifyContent:"right", width:"20%"}}src={d.image}/>}
          </div>
        </Comment>
       </>
        )
      })}
            </Content>
            )
        })}
        </Container>
    )
}


export default Detail;