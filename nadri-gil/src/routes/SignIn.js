import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useMutation } from "react-query";
import { postLogin } from "../api.js"
import { isLoginedAtom, loginIdAtom } from "../atom.js"
import { useSetRecoilState, useRecoilValue } from "recoil";

function SignIn(){
    // 아이디
    const [id, setId] = useState("")
    // 비밀번호
    const [password, setPassword] = useState("")
    let navigate = useNavigate();

    const setIsLoginedFn = useSetRecoilState(isLoginedAtom)
    const setLoginIdFn = useSetRecoilState(loginIdAtom)
    const islogined = useRecoilValue(isLoginedAtom)
    console.log(islogined)
    const { mutate, isLoading } = useMutation(postLogin, {
        onSuccess: data => {
          console.log(data);
          const message = "success"
          alert(message)
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
        <div>
            <h1>로그인</h1>
            <h3>아이디</h3>
            <input type="text" onChange={onIdHandler}/>
            <h3>비밀번호</h3>
            <input type="password" onChange={onPasswordHandler}/>
            <button onClick={onClickLogin}>로그인</button>
        </div>
    )
}
export default SignIn;