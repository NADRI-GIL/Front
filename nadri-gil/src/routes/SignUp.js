import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useMutation } from "react-query";
import { postSignup } from "../api.js"

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

    let navigate = useNavigate();


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


    const onClickSignUp = () =>{
        console.log(id, password, email, name)
        mutate({
            "loginId" : id,
            "password" : password,
            "name" : name,
            "email" : email
        })
    }
    return(
        <div>
            <h1>회원가입</h1>
            <h3>이름</h3>
            <input type="text" onChange={onNameHandler}/>
            <h3>아이디</h3>
            <input type="text" onChange={onIdHandler}/>
            <h3>비밀번호</h3>
            <input type="password" onChange={onPasswordHandler}/>
            <h3>비밀번호 확인</h3>
            <input type="password" onChange={onConfirmPasswordHandler}/>
            {password === confirmPassword ? <p>비밀번호가 일치합니다.</p> : <p>비밀번호가 일치하지 않습니다.</p>}
            <h3>이메일</h3>
            <input type="text" onChange={onEmailHandler}/>
            <button onClick={onClickSignUp}>회원가입</button>
        </div>
    )
}
export default SignUp;