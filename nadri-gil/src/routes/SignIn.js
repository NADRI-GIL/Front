import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useMutation } from "react-query";
import { postLogin } from "../api.js"
import { isLoginedAtom, loginIdAtom } from "../atom.js"
import { useSetRecoilState, useRecoilValue } from "recoil";
import cookie from 'react-cookies';
import { useCookies } from 'react-cookie';

// import { setCookie } from "Cookie";

// const setCookie = (name, value, exp = 5) => {
//   let date = new Date();
//   // 날짜 생성
//   date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
//   // 저장!  setTime()은 1970년1월1일부터 경과된 시간을 밀리초로 수정함 (날짜정보를 수정)
//   //getTime()은 1970년1월1일부터 경과된 시간을 밀리초로 표기함 (날짜정보를 가져올떄)
//   document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
//   //toUTCString()은 UTC 표준 시간대를 사용하여 지정된 날짜를 나타내는 문자열
// };

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