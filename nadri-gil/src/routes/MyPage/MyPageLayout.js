import { useState } from "react";
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "../../index.css"

const Container = styled.div`
display:flex;
width:60%;
margin:auto;
`
const ListContainer = styled.div`
width:20%;
a{
    text-decoration: none;
    color:black; 
}
`
const Item = styled.div`
width:100%;
display:flex;
// border:1px solid black;
height:5vh;
font-family: 'SUIT';
font-size:0.8vw;
align-items : center;
p{margin-left:1.5vw;
margin-bottom:0;}
&:hover{
    background-color: rgb(242,242,242);
}
`

function MyPage() {
    const list = [
        {
            id: 0,
            title: "회원정보 수정",
            to: "./mypageinfo"
        },
        {
            id: 1,
            title: "찜한 여행지",
            to: "./mypageheartlist"
        },
        {
            id: 2,
            title: "코스 만들기",
            to: "./mypagecourse"
        },
        {
            id: 3,
            title: "제작한 코스",
            to: "./mypageheartlist"
        },
        {
            id: 4,
            title: "남긴 리뷰",
            to: "./mypageheartlist"
        }


    ];
    const [index, setIndex] = useState(0);
    return (
        <Container>
            <ListContainer>
                {list.map((item) => {
                    return (
                        <Link to={item.to}>
                            <Item style={{ backgroundColor: item.id === index ? "rgb(242,242,242)" : "" }}
                                onClick={() => setIndex(item.id)}>
                                <p>{item.title}</p>
                            </Item>
                        </Link>
                    )
                })}
            </ListContainer>
            <Outlet />
        </Container>
    )
}

export default MyPage