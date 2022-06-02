import React, {useState} from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Container = styled.div`
width: 30%;
  margin-top: 100px;
  margin:auto;
  padding: 20px;
`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
`;

const Button = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #03c75a;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
  `}
`;

function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 
	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
 
	// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log('click login')
        if(inputId == 'daeun' && inputPw == '1234'){
            alert('로그인 성공')
        }
        else{
            alert('아이디와 비밀번호를 확인해주십시오')
        }
    }
 
	// // 페이지 렌더링 후 가장 처음 호출되는 함수
    // useEffect(() => {
    //     axios.get('/user_inform/login')
    //     .then(res => console.log(res))
    //     .catch()
    // },
    // // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    // [])
 
    return(
        <Container>
            <h2>로그인</h2>
            <div>
                <label htmlFor='input_id'>ID : </label>
                <Input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <Input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
            <Link to="/"><Button type='button' onClick={onClickLogin}>로그인</Button></Link>
            </div>
        </Container>
    )
}

export default Login;