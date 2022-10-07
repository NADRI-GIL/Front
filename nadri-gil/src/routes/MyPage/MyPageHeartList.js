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
function MyPageHeartList(){
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
                "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
            },
            {
                "id": 3,
                "name": "여행지 명3",
                "location": "지역(분류)",
                "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
            },
            {
                "id": 4,
                "name": "여행지 명4",
                "location": "지역(분류)",
                "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
            },
            {
                "id": 1,
                "name": "여행지 명1",
                "location": "지역(분류)",
                "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
            },]
    return(
        <Container>
        <h3>찜한 여행지</h3>
        <Hr></Hr>
        <ContentList>
                
                {data.map((item) => {
                    return (
                        <Content>
                            <a href="">
                                <img src={item.image}></img>
                                <p>{item.name}</p>
                            </a>
                        </Content>
                    )
                })
                }
            </ContentList>
        </Container>
    )

}
export default MyPageHeartList;