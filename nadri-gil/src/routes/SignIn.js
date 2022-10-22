import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import styled from "styled-components";
import { useMutation } from "react-query";
import { postLogin } from "../api.js"
import { isLoginedAtom, loginIdAtom } from "../atom.js"
import { useSetRecoilState, useRecoilValue } from "recoil";

const Container = styled.div`
h3{font-family: 'SUIT';}
width:40%;
margin:auto;
`
const LoginContainer = styled.div`
width:40%;
margin:auto;
`
const Hr = styled.hr`
border:0;
height:2px;
background-color:#f4f4f4;
`
const Title = styled.p`
font-family: 'SUIT';
font-size:1vw;
margin-top: 1.5vh;
`
const Text = styled.a`
display:inline-block;
font-family: 'SUIT';
font-size:0.7vw;
margin:2vh 0vh 0.5vh 0vh;
`
const Input = styled.input`
background-color: #F6F6F6;
font-family: 'SUIT';
height: 4.5vh;
width:100%;
border-radius: 0.5vw;
border: none;
margin:0.5vh 0 1vh 0;
padding-left: 1vw;
outline-color: #3366ff;
::placeholder{
    font-family: 'SUIT';
}
&:focus {
    background-color: white;
}
`
const CompleteButton = styled.button`
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
margin-top:5vh;
`
function SignIn(){
    // 아이디
    const [id, setId] = useState("")
    // 비밀번호
    const [password, setPassword] = useState("")
    let navigate = useNavigate();
    // setCookie("userId", id, 3);
    const setIsLoginedFn = useSetRecoilState(isLoginedAtom)
    const setLoginIdFn = useSetRecoilState(loginIdAtom)
    const islogined = useRecoilValue(isLoginedAtom)
   
  
    const { mutate, isLoading } = useMutation(postLogin, {
        onSuccess: data => {
          if(data.resultCode === 0){
            alert(data.resultMsg)
            // 로그인 상태 저장
            setIsLoginedFn(true)
            setLoginIdFn(id)
            // 메인 페이지로 이동
            // navigate('/')
          }
          else{
            alert(data.resultMsg)
          }
        },
        onError: () => {
          alert("there was an error")
        },

      });

    // 아이디 입력 시
    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }

    // 비밀번호 입력 시
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onClickLogin = () =>{
        console.log(id, password)
        mutate(
            {
                "loginId" : id,
                "password" : password
            }
            
        )
    }
    return(
        <Container>
            <h3>로그인</h3>
            <Hr></Hr>
            <LoginContainer>
            <Title>아이디</Title>
            <Input type="text" onChange={onIdHandler}/>
            <Title>비밀번호</Title>
            <Input type="password" onChange={onPasswordHandler}/>
            <div style={{ textAlign: "center"}}>
            <CompleteButton onClick={onClickLogin}>로그인</CompleteButton>
            <br></br>
            <Text href="/signUp">회원가입</Text>
            </div>
            
            </LoginContainer>
        </Container>
    )
}
export default SignIn;