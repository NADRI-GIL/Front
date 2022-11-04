import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "../../index.css"

import { getCart} from "../../api.js"
import { useMutation } from "react-query";

import { isLoginedAtom, loginIdAtom } from "../../atom.js"
import { useRecoilValue } from "recoil";

const Container = styled.div`
h3{font-family: 'SUIT';}
width:100%;
padding-left:2vw;
`
const Hr = styled.hr`
border:0;
height:2px;
background-color:#f4f4f4;
`
const ContentList = styled.div`
display:flex;
flex-wrap:wrap;
width:100%;
margin:auto;
margin-top:3vh;
`
const Content = styled.div`
width:25%;
height:22vh;
padding:5px;
text-align:center;

    img{
        object-fit: cover;
        height:15vh;
        // overflow: hidden;
        width:100%;
    }
    p{
        font-family: 'SUIT';
        font-size:0.8vw;
        margin-top:1vh;
    }
`;
const BackImage = styled.img`
 position:absolute;
 top:0;
 left:0;
`
const FrontImage = styled.img`
position:absolute;
top:0;
left:0;
// opacity:0.5;
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
function MyPageCourse(){
    const image = [
        'https://user-images.githubusercontent.com/58421346/194632471-9da92ca4-b580-4526-a71f-1f169e0f4633.png', 
        "https://user-images.githubusercontent.com/58421346/194632534-3a77eca2-5adf-4a74-9df1-76999ad9ff71.png",
        "https://user-images.githubusercontent.com/58421346/194632615-aaab4544-ed1f-4b45-9c06-d3c6da718b8c.png",
        "https://user-images.githubusercontent.com/58421346/194632655-cece31a3-2d0f-4e69-8161-4e421ec66094.png",
        "https://user-images.githubusercontent.com/58421346/194632660-2b3ee8fe-4d64-42d6-92e2-b307d0ba2bb5.png"
    ]
    let navigate = useNavigate();
    const isLogined = useRecoilValue(isLoginedAtom);
    const loginId = useRecoilValue(loginIdAtom)
    const [cartData, setCartData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const { mutate, isLoading } = useMutation(getCart, {
        onSuccess: data => {
            console.log(data);
            if (data.resultCode === 0) {
                setCartData(data.list)
            }
            else {
                alert(data.resultMsg)
            }
        },
        onError: () => {
            alert("there was an error")
        },

    });
    useEffect(()=>{
        mutate({"loginId":loginId})
    }, [])
    const addCourseData = (travel) => {
        if(courseData.findIndex(i=>i.travelId == travel.travelId) === -1 ){
            if(courseData.length < 17) setCourseData([...courseData, travel])
            else alert("최대 17개까지 등록할 수 있습니다.")
        }
        else{
            let tmp = [...courseData]
            tmp.splice(courseData.findIndex(i=>i.travelId == travel.travelId), 1)
            setCourseData([...tmp])
        }
    }
    const createCourseButton = () =>{
        // navigate('/createcourse', {coursePoints:{courseData}})
    }
 
    return(
        <Container>
        <h3>코스 만들기</h3>
        <Hr></Hr>
        {/* <Info>
        <span>선택한 여행지로 코스 만들러 가기</span>
        <button>&gt;</button>
        </Info> */}
        <ContentList>
                {cartData?.map((item) => {
                    return (
                        <Content onClick={()=>addCourseData(item)}>
                            <div style={{position:"relative"}}>
                                <BackImage src={item.image}/>
                                {image[courseData.findIndex(i=>i.travelId ==item.travelId)]!=undefined?
                                <FrontImage src={image[courseData.findIndex(i=>i.travelId ==item.travelId)]} />:''}
                                </div>
                                <img src={item.image}/>
                                <p>{item.name}</p>
                        </Content>
                    )
                })
                }
        </ContentList>
        <Link to='/createcourse' state={courseData}>
        <CompleteButton type='button' onClick={createCourseButton}>선택한 여행지로 코스 만들러 가기 -&gt;</CompleteButton>
        </Link>
        </Container>
    )

}
export default MyPageCourse;