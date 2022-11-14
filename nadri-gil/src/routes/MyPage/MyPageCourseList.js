import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "../../index.css"

import { getCourse, deleteCourse} from "../../api.js"
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
const Shared = styled.p`
margin:auto 0;
margin-right:0.4vw;
font-family: 'SUIT';
font-size:0.7vw;
background-color:#e1e9ff;
color:#3366ff;
border-radius: 20px;
padding:0.3vh 0.3vw 0.3vh 0.3vw;
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
function MyPageCourse(){
    const loginId = useRecoilValue(loginIdAtom)
    const [courseData, setCourseData] = useState([]);
    const { mutate, isLoading } = useMutation(getCourse, {
        onSuccess: data => {
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

    const { mutate:deleteMutate, isLoading:isDeleteLoading } = useMutation(deleteCourse, {
        onSuccess: data => {
            if (data.resultCode === 0) {
                alert('삭제되었습니다.')
                mutate({"loginId":loginId})
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

    const onClinkDeleteCourse = (courseId, courseName) => {
        if(window.confirm(`"${courseName}"을 삭제하시겠습니까?`)){
            deleteMutate(courseId)
        }
        
    }
 
    return(
        <Container>
        <h3>내가 만든 코스</h3>
        <Hr></Hr>
        <ContentList>
                {courseData?.map((item) => {
                    return (
                        <Content >
                            
                                <div style={{display:'flex'}}>
                                {item._shared?<Shared>공유</Shared>:''}
                                <StyledLink to ={`/viewcourse/${item.id}`}>
                                <Title>{item.name}</Title>
                                </StyledLink>
                                <Delete onClick={()=>{onClinkDeleteCourse(item.id, item.name)}}>삭제</Delete>
                                </div>
                                <StyledLink to ={`/viewcourse/${item.id}`}>
                                <div style={{ borderLeft: "0.2vw solid #3366ff", marginTop:"2vh"}}>
                                {item.courseTravels.map((travelname)=>
                                <Name>{travelname.travelName}</Name>)}
                                </div>
                                </StyledLink>

                            
                        </Content>
                    )
                })
                }
        </ContentList>
        </Container>
    )

}
export default MyPageCourse;