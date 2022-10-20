import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import styled from "styled-components";
import { useMutation } from "react-query";
import { postSignup } from "../api.js"


const Container = styled.div`
h3{font-family: 'SUIT';}
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
const AvailablePw = styled(Title)`
font-size:0.7vw;
margin:0vh 0vh 0.5vh 0vh;
color:green;
`
const UnAvailablePw = styled(Title)`
font-size:0.7vw;
margin:0vh 0vh 0.5vh 0vh;
color:red;
`
const Input = styled.input`
background-color: #F6F6F6;
font-family: 'SUIT';
height: 4.5vh;
width:20vw;
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
function SignUp(){
    // 아이디
    const [id, setId] = useState("")
    // 비밀번호
    const [password, setPassword] = useState("")
    // 비밀번호 확인
    const [confirmPassword, setConfirmPassword] = useState("")
    // 이름
    const [name, setName] = useState("")
    // 이메일
    const [email, setEmail] = useState("")

    const [nickname, setNickname] = useState("")

    let navigate = useNavigate();
    console.log(id, password);

    const { mutate, isLoading } = useMutation(postSignup, {
        onSuccess: data => {
          console.log(data);
          if(data.resultCode === 0){
            alert(data.resultMsg)
            // 로그인 페이지로 이동
            navigate('/signIn')
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
    // 비밀번호 확인 입력 시
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    // 이름 입력 시
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    // 이메일 입력 시
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNicknameHandler = (event) => {
        setNickname(event.currentTarget.value)
    }


    const onClickSignUp = () =>{
        console.log(id, password, email, name)
        mutate({
            "loginId" : id,
            "password" : password,
            "name" : name,
            "email" : email,
            "nickname": nickname,
        })
    }
    return(
        <Container>
            <h3>회원가입</h3>
            <Hr></Hr>
            <Title>이름</Title>
            <Input type="text" onChange={onNameHandler}/>
            <Title>아이디</Title>
            <Input type="text" onChange={onIdHandler}/>
            <Title>비밀번호</Title>
            <Input type="password" onChange={onPasswordHandler}/>
            <Title>비밀번호 확인</Title>
            <Input type="password" onChange={onConfirmPasswordHandler}/>
            {password.length===0? '': password === confirmPassword ? <AvailablePw>비밀번호가 일치합니다.</AvailablePw> : <UnAvailablePw>비밀번호가 일치하지 않습니다.</UnAvailablePw>}
            <Title>이메일</Title>
            <Input type="text" onChange={onEmailHandler}/>
            <Title>닉네임</Title>
            <Input type="text" onChange={onNicknameHandler}/>
            <div style={{ textAlign: "center"}}>
            <CompleteButton onClick={onClickSignUp}>회원가입</CompleteButton>
            </div>
        </Container>
    )
}
export default SignUp;