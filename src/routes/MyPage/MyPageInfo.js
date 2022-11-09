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
const InfoContainer = styled.div`
display:flex;
font-family: 'SUIT';
width:100%;
`
const Title = styled.p`
color:#868686;
width:10%;
font-size:0.7vw;
`
const Text = styled.p`

`
const Modify = styled.p`
position: absolute;
        right: 35vw;

`
const Button = styled.button`
padding:1vh 2vw 1vh 2vw;
margin-top:1vh;
border: 1px solid #B8B8B8;
border-radius:0.5vw;
font-family: 'SUIT';
background-color:#FAFAFA;
`
const Hr = styled.hr`
border:0;
height:2px;
background-color:#f4f4f4;
`
function MyPageInfo(){
    return(
        <Container>
        <h3>나의 정보</h3>
        <Hr></Hr>
        <InfoContainer><Title>닉네임</Title><Text>닉네임입니당</Text></InfoContainer>
        <InfoContainer><Title>아이디</Title><Text>아이디입니당</Text></InfoContainer>
        <InfoContainer><Title>이메일</Title><Text>이메일입니당</Text></InfoContainer>
        <Button>비밀번호 변경</Button>
        </Container>
    )

}
export default MyPageInfo;