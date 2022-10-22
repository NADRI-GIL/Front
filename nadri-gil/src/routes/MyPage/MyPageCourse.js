import { useState } from "react";
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "../../index.css"

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
width:23.5%;
height:20vh;
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
const Banner = styled.div`

`
function MyPageCourse(){
    const data = [
            {
                "id": 1,
                "name": "여행지 명1",
                "location": "지역(분류)",
                "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
            },
            {
                "id": 2,
                "name": "여행지 명2",
                "location": "지역(분류)",
                "image": "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=3a7a695b-499c-472d-b767-32b23b71ce55"
            },
            {
                "id": 3,
                "name": "여행지 명3",
                "location": "지역(분류)",
                "image": "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=080df1f5-0b3c-40ad-b2d7-8bc4f0e04e51"
            },
            {
                "id": 4,
                "name": "여행지 명4",
                "location": "지역(분류)",
                "image": "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=96e86c56-ad37-467f-b17f-099b563ba33e"
            },
            {
                "id": 5,
                "name": "여행지 명5",
                "location": "지역(분류)",
                "image": "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=63fc8a33-3b88-45fd-8390-398c638802b1"
            },
            {
                "id": 6,
                "name": "여행지 명6",
                "location": "지역(분류)",
                "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
            },
            {
                "id": 7,
                "name": "여행지 명7",
                "location": "지역(분류)",
                "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
            },
        ]
    const image = [
        'https://user-images.githubusercontent.com/58421346/194632471-9da92ca4-b580-4526-a71f-1f169e0f4633.png', 
        "https://user-images.githubusercontent.com/58421346/194632534-3a77eca2-5adf-4a74-9df1-76999ad9ff71.png",
        "https://user-images.githubusercontent.com/58421346/194632615-aaab4544-ed1f-4b45-9c06-d3c6da718b8c.png",
        "https://user-images.githubusercontent.com/58421346/194632655-cece31a3-2d0f-4e69-8161-4e421ec66094.png",
        "https://user-images.githubusercontent.com/58421346/194632660-2b3ee8fe-4d64-42d6-92e2-b307d0ba2bb5.png"
    ]
    const [courseData, setCourseData] = useState([]);

    const addCourseData = (id) => {
        if(courseData.indexOf(id) === -1 ){
            if(courseData.length < 5) setCourseData([...courseData, id])
            else alert("최대 5개까지 등록할 수 있습니다.")
        }
        else{
            let tmp = [...courseData]
            tmp.splice(courseData.indexOf(id), 1)
            setCourseData([...tmp])
        }
    }
    return(
        <Container>
        <h3>코스 만들기</h3>
        <Hr></Hr>
        <ContentList>
                {data.map((item) => {
                    return (
                        <Content onClick={()=>addCourseData(item.id)}>
                            <div style={{position:"relative"}}>
                                <BackImage src={item.image}/>
                                <FrontImage src={image[courseData.indexOf(item.id)]}/>
                                </div>
                                <img src={item.image}/>
                                <p>{item.name}</p>
                        </Content>
                    )
                })
                }
            </ContentList>
        </Container>
    )

}
export default MyPageCourse;