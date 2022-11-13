import { useState } from "react";
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "../../index.css"

import { loginIdAtom } from "../../atom.js"
import { useRecoilValue } from "recoil";

import { getInfo } from "../../api.js"
import { useQuery } from "react-query";

const Container = styled.div`
h3{font-family: 'SUIT';}
width:100%;
padding-left:2vw;
`
const InfoContainer = styled.div`
display:flex;
font-family: 'SUIT';
width:100%;
margin:2vh 0 2vh 0;
`
const Title = styled.p`
color:#868686;
width:10%;
font-size:0.7vw;
margin:auto 0 auto 0;
`
const Text = styled.p`
margin:auto 0 auto 0;
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
function MyPageInfo() {
    const loginId = useRecoilValue(loginIdAtom);
    const [userInfo, setUserInfo] = useState();
    const { data, isLoading } = useQuery(['userInfo', loginId], () => getInfo(loginId), {
        cacheTime: Infinity,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: data => {
            setUserInfo(data.list[0])
            console.log(data);
        },
    })
    return (
        <Container>
            <h3>나의 정보</h3>
            <Hr></Hr>
            {isLoading ? 'loading...' :
                <div>
                    <InfoContainer><Title>닉네임</Title><Text>{userInfo.nickname}</Text></InfoContainer>
                    <InfoContainer><Title>아이디</Title><Text>{userInfo.loginId}</Text></InfoContainer>
                    <InfoContainer><Title>이메일</Title><Text>{userInfo.email}</Text></InfoContainer>
                </div>
            }
            <Button>비밀번호 변경</Button>
        </Container>
    )

}
export default MyPageInfo;