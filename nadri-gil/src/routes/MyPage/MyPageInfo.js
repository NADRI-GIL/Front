import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "../../index.css"

import { loginIdAtom, isLoginedAtom } from "../../atom.js"
import { useRecoilValue, useSetRecoilState } from "recoil";

import { getInfo, postDeleteUser, postLogin, postChangePassword } from "../../api.js"
import { useMutation, useQuery } from "react-query";

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

const Popupdiv = styled.div`
font-family: 'SUIT';
backdrop-filter: blur;
background-color: white;
border:2px solid rgb(245 244 244);
box-shadow: 0 5px 18px -7px rgba(0,0,0,1);
z-index: 10;
top: 30%;
left: 38%;
position: fixed;
height: 40vh;
width: 30vw;
border-radius : 20px;
text-align: center;
align-item: center;
h4{
    margin-top:5vh;
}
input{
    background-color :rgb(240, 237, 237);
    border-radius: 10px;
    border: none;
    width: 80%;
    height: 15%;
    padding-left:1vw;
}
button{
    font-family: 'SUIT';
    box-sizing: border-box;
    background-color:#3366ff;
    color:#ffffff;
    border:none;
    border-radius: 10px;
    height: 6vh;
    font-size:0.8vw;
    padding:0 5vh 0 5vh;
    margin:3vh 1vw 0 1vw;
}
p{
    margin:3vh 0vw 0 0vw;
}

`

function MyPageInfo() {
    let navigate = useNavigate();
    const loginId = useRecoilValue(loginIdAtom);
    const setIsLoginedFn = useSetRecoilState(isLoginedAtom);
    const setLoginIdFn = useSetRecoilState(loginIdAtom);
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

    useEffect(() => {
        if (data) {
            setUserInfo(data.list[0])
        }

    }, [userInfo])

    const [changePasswordPopup, setChangePasswordPopup] = useState(false);
    const [deleteUserPopup, setDeleteUserPopup] = useState(false);
    const [password, setPassword] = useState("")
    const [changePassword, setChangePassword] = useState("")


    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onChangePasswordHandler = (event) => {
        setChangePassword(event.currentTarget.value)
    }
    const { mutate: deleteUserMutate } = useMutation(postDeleteUser, {
        onSuccess: data => {
            if (data.resultCode === 0) {
                alert('회원탈퇴가 완료되었습니다.')
                setIsLoginedFn(false);
                setLoginIdFn("");
                navigate('/')
            }
            else {
                alert(data.resultMsg)
            }
        },
        onError: () => {
            console.log("error");
        },

    });
    const { mutate: changePasswordMutate } = useMutation(postChangePassword, {
        onSuccess: data => {
            if (data.resultCode === 0) {
                alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.')
                setIsLoginedFn(false);
                setLoginIdFn("");
                navigate('/')
            }
            else {
                alert(data.resultMsg)
            }
        },
        onError: () => {
            console.log("error");
        },

    });
    const { mutate: changeCheckMutate } = useMutation(postLogin, {
        onSuccess: data => {
            // console.log(data);
            if (data.resultCode === 0) {
                alert(data.resultMsg)
                changePasswordMutate(
                    {
                        "loginId": loginId,
                        "password": changePassword
                    }
                )
            }
            else {
                alert(data.resultMsg)
            }
        },
        onError: () => {
            console.log("error");
        },

    });
    const { mutate: deleteCheckMutate } = useMutation(postLogin, {
        onSuccess: data => {
            // console.log(data);
            if (data.resultCode === 0) {
                deleteUserMutate(loginId)
            }
            else {
                alert(data.resultMsg)
            }
        },
        onError: () => {
            console.log("error");
        },

    });

    const onDeleteUser = () => {
        deleteCheckMutate(
            {
                "loginId": loginId,
                "password": password
            }
        )
    }
    const onChangePassword = () => {
        changeCheckMutate(
            {
                "loginId": loginId,
                "password": password
            }
        )
    }
    return (
        <Container>
            <h3>나의 정보</h3>
            <Hr></Hr>
            {userInfo === undefined ? 'loading...' :
                <div>
                    <InfoContainer><Title>닉네임</Title><Text>{userInfo.nickname}</Text></InfoContainer>
                    <InfoContainer><Title>아이디</Title><Text>{userInfo.loginId}</Text></InfoContainer>
                    <InfoContainer><Title>이메일</Title><Text>{userInfo.email}</Text></InfoContainer>
                    <Button onClick={() => { setChangePasswordPopup(true); setPassword('');setChangePassword(''); }}>비밀번호 변경</Button>
                    <Title style={{ color: "red", cursor: 'pointer', marginTop:'3vh' }} onClick={() => { setDeleteUserPopup(true); setPassword(''); }}>회원탈퇴</Title>

                </div>
            }
            {changePasswordPopup && <Popupdiv style={{ height: '50vh' }}>
                <h4>비밀번호 변경</h4>
                <p>현재 비밀번호를 입력해주세요.</p>
                <input type="password" onChange={onPasswordHandler} value={password} ></input>
                <p>변경할 비밀번호를 입력해주세요.</p>
                <input type="password" onChange={onChangePasswordHandler} value={changePassword} ></input>
                <button onClick={() => {
                    setChangePasswordPopup(false)
                }} >취소</button>
                <button onClick={() => {
                    onChangePassword()
                }} >변경</button>
            </Popupdiv>}
            {deleteUserPopup && <Popupdiv>
                <h4>회원탈퇴</h4>
                <p>탈퇴하게 되면 작성한 리뷰 및 별점은 삭제되지 않습니다.<br />
                    회원을 탈퇴하시려면 비밀번호를 입력해주세요.<br />
                    탈퇴하시겠습니까?</p>
                <input type="password" onChange={onPasswordHandler} value={password}></input>
                <button onClick={() => {
                    setDeleteUserPopup(false)
                }} >취소</button>
                <button onClick={() => {
                    onDeleteUser()
                }} >탈퇴</button>
            </Popupdiv>}
        </Container>
    )

}
export default MyPageInfo;