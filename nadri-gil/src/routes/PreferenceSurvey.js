import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components";
import { useQuery, useMutation } from "react-query";
import { getPreference, postPreferenceData } from "../api.js"

import { loginIdAtom } from "../atom.js"
import { useRecoilValue } from "recoil";

const Container = styled.div`
h3{font-family: 'SUIT';}
    width:60%;
    margin:auto;
`;


const ContentList = styled.div`
display:flex;
flex-wrap:wrap;
width:100%;
margin:auto;
margin-top:3vh;
`
const Content = styled.div`
width:23.5%;
height:25vh;
padding:5px;
text-align:center;
    img{
        object-fit: cover;
        height:18vh;
        width:100%;
    }
    a{
        text-decoration: none;
        color:black;
    }
    p{
        font-family: 'SUIT';
        font-size:0.8vw;
        margin-top:1vh;
    }
`;


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
`
function PreferenceSurvey() {
    const [preferenceTravel, setPreferenceTravel] = useState([])
    const loginId = useRecoilValue(loginIdAtom);
    let navigate = useNavigate();
    const { isLoading, isError, error, data } = useQuery('preference', getPreference,{
        cacheTime: Infinity,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: data => {
            // 성공시 호출
            console.log(data);
          },
          onError: e => {
            // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
            // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
            console.log(e.message);
          }
    });
    const { mutate: addPreference } = useMutation(postPreferenceData, {
        onSuccess: data => {
            if (data.resultCode === 0) {
                alert('선호도 조사가 완료되었습니다.')
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

    const onPreferenceTravelHandler = (id) => {
        if(preferenceTravel.indexOf(id)===-1){
            if(preferenceTravel.length === 5){
                alert('최대 다섯 개까지 선택 가능합니다.')
            }
            else{setPreferenceTravel([...preferenceTravel, id])}
        }
        else{
            let tmp = [...preferenceTravel]
            tmp.splice(tmp.indexOf(id), 1)
            setPreferenceTravel([...tmp])
        }
    }
    const onClickHandler = () => {
        console.log(preferenceTravel)
        addPreference({
            "loginId":loginId,
            "travelIds":preferenceTravel
        })
    }

    return (
        <Container>
            <h3>여행지 선호도 조사 페이지</h3>
            <ContentList>
            {!isLoading?data.list.map((item) => {
                if (preferenceTravel.indexOf(item.travleId)!=-1) {
                    return (
                        <Content>
                            <img src={item.travelImage} style={{filter:'brightness(0.5)'}} onClick={() => onPreferenceTravelHandler(item.id)}></img>
                            <p onClick={() => onPreferenceTravelHandler(item.travelId)}>{item.travelName}</p>
                        </Content>
                    )
                }
                else{
                    return (
                        <Content>
                            <img src={item.travelImage} onClick={() => onPreferenceTravelHandler(item.travelId)}></img>
                            <p onClick={() => onPreferenceTravelHandler(item.travelId)}>{item.travelName}</p>
                        </Content>
                    )
                }

            }):'loading...'}
            </ContentList>
            <div style={{textAlign: "center"}}>
            <CompleteButton onClick={onClickHandler}>완료</CompleteButton>

            </div>
        </Container>
    )
}
export default PreferenceSurvey;