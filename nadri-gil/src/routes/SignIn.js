import React, { useState } from 'react'
import {Link} from "react-router-dom"

function SignIn(){
    // 아이디
    const [id, setId] = useState("")
    // 비밀번호
    const [password, setPassword] = useState("")

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