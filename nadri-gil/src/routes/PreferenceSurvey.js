import React, { useState } from 'react'
import styled from "styled-components";
import { useQuery } from "react-query";
import { getPreference } from "../api.js"

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
    // const { isLoading, isError, error, data } = useQuery('preference', getPreference,{
    //     cacheTime: Infinity,
    //     staleTime: Infinity,
    //     refetchOnMount: false,
    //     refetchOnWindowFocus: false,
    //     retry: 0,
    // });
    
    const data = {
        list:[
        { id: 0, name: '경복궁', image: './img/images.jpg' },
        { id: 1, name: '경복궁1', image: './img/images.jpg' },
        { id: 2, name: '경복궁2', image: './img/images.jpg' },
        { id: 3, name: '경복궁3', image: './img/images.jpg' },
        { id: 4, name: '경복궁4', image: './img/images.jpg' },
        { id: 5, name: '경복궁5', image: './img/images.jpg' },
        { id: 6, name: '경복궁6', image: './img/images.jpg' },
        ]
    }

    const onPreferenceTravelHandler = (id) => {
        if(preferenceTravel.indexOf(id)===-1){
            setPreferenceTravel([...preferenceTravel, id])
        }
        else{
            let tmp = [...preferenceTravel]
            tmp.splice(tmp.indexOf(id), 1)
            setPreferenceTravel([...tmp])
        }
    }
    const onClickHandler = () => {
        console.log(preferenceTravel)
    }

    return (
        <Container>
            <h3>여행지 선호도 조사 페이지</h3>
            <ContentList>
            {data.list.map((item) => {
                if (preferenceTravel.indexOf(item.id)!=-1) {
                    return (
                        <Content>
                            <img src={item.image} style={{filter:'brightness(0.5)'}} onClick={() => onPreferenceTravelHandler(item.id)}></img>
                            <p onClick={() => onPreferenceTravelHandler(item.id)}>{item.name}</p>
                        </Content>
                    )
                }
                else{
                    return (
                        <Content>
                            <img src={item.image} onClick={() => onPreferenceTravelHandler(item.id)}></img>
                            <p onClick={() => onPreferenceTravelHandler(item.id)}>{item.name}</p>
                        </Content>
                    )
                }

            })}
            </ContentList>
            <div style={{textAlign: "center"}}>
            <CompleteButton onClick={onClickHandler}>완료</CompleteButton>

            </div>
        </Container>
    )
}
export default PreferenceSurvey;