import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "../../index.css"

import { getCourse} from "../../api.js"
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

`;
const Title = styled.p`
margin-top:1vh;
font-family: 'SUIT';
font-size:0.8vw;
`
const Name = styled.p`
font-size:0.6vw;
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
    const loginId = useRecoilValue(loginIdAtom)
    const [courseData, setCourseData] = useState([]);

    const { mutate, isLoading } = useMutation(getCourse, {
        onSuccess: data => {
            console.log(data);
            if (data.resultCode === 0) {
                setCourseData(data.list)
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
 
    return(
        <Container>
        <h3>내가 만든 코스</h3>
        <Hr></Hr>
        <ContentList>
                {courseData?.map((item) => {
                    return (
                        <Link to ={`/viewcourse/${item.id}`}>
                        <Content >
                                <Title>{item.name}</Title>
                                {item.courseTravels.map((travelname)=>
                                <Name>{travelname.travelName}</Name>)}
                        </Content>
                        </Link>
                    )
                })
                }
        </ContentList>
        </Container>
    )

}
export default MyPageCourse;