import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../index.css"
import {Link } from 'react-router-dom';

import { loginIdAtom, isLoginedAtom } from "../atom.js"
import { constSelector, useRecoilValue } from "recoil";
import { AiFillStar, AiFillHeart } from 'react-icons/ai';


import { getRecommend } from "../api.js"
import { useQuery } from "react-query";

const Container = styled.div`
    width:55%;
    margin:auto;
    p{
        font-family: 'SUIT';
        margin-top:1vh;
    }
`;

const ContentList = styled.div`
display:flex;
flex-wrap:wrap;
width:100%;
margin:auto;
margin-top:3vh;
`
const Content = styled.div`
width:25%;
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
const SelectContainer = styled.div`
width:100%;
margin-top:4vh;

`;
const Select = styled.div`
cursor : pointer;
display:inline-block;
font-family: 'SUIT';
border: none;
border-radius: 20px;
padding:1vh 1vw 1vh 1vw;
background-color:#e1e9ff;
color:#3366ff;
text-align-last: center;
text-align: center;
`;
const Selected = styled.div`
cursor : pointer;
display:inline-block;
font-family: 'SUIT';
border: none;
border-radius: 20px;
padding:1vh 1vw 1vh 1vw;
background-color:#F5F5F5;
color:#464646;
text-align-last: center;
text-align: center;
`;
const Hr = styled.hr`
border:0;
height:2px;
background-color:#f4f4f4;
`

const Pagination = styled.div`
width:100%;
height:4vh;
margin: 7vh 0 0 0;
// background-color:yellow;
// display:flex;
// vertical-align:middle;
text-align:center;
`

const PageButton = styled.button`
font-family: 'SUIT';
border:none;
border-radius:5px;
width:2vw;
height:2vw;
margin:0 0.3vw 0 0.3vw;
padding:0;
text-align: center;
`
const CurrentPageButton = styled(PageButton)`
border:1px solid #3366ff;
background-color:white;
`
function TravelListHeart() {
    const loginId = useRecoilValue(loginIdAtom);
    const isLogined = useRecoilValue(isLoginedAtom);

    const { isLoading, data, isFetching } = useQuery(['Recommend', loginId], getRecommend, {
        cacheTime: Infinity,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: data => {
            // 성공시 호출
            setTravelList(data.data.list)
            console.log(data);
        },
        onError: e => {
            // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
            // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
            console.log(e.message);
        }
    });

    const [travelList, setTravelList] = useState([]);
    const [limit, setLimit] = useState(24);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageList, setPageList] = useState([1, 2, 3])
    const offset = (currentPage - 1) * limit;

    useEffect(()=>{
        if(data&&travelList.length===0){
            setTravelList(data.data.list)
        }
        console.log(travelList)

    },[travelList])

    return (
        <Container>
            {isLogined?
            <ContentList>

                {travelList.length===0 ? 'loading...' : travelList.slice(offset, offset+limit).map((item) => {
                    return (
                        <Content>
                            <a href={`/TravelDetail/${item.id}`} target='_blank' rel='noreferrer'>
                                <img src={item.image}></img>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '98%', margin: '0.5vh auto' }}>
                                    <p style={{ color: '#3366ff' }}>{item.location}</p>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <AiFillStar color='#ffda38' size='20'></AiFillStar><span>{item.reviewTotal.toFixed(1)}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.3vw' }}>
                                            <AiFillHeart color='red' size='20'></AiFillHeart><span>{item.likeCount}</span>
                                        </div>
                                    </div>

                                </div>
                                <div style={{ width: '98%', margin: 'auto' }}>
                                    <p>{item.name}</p>
                                </div>
                            </a>
                        </Content>
                        
                    )
                })
                }
                {isLoading?
                ''
            :
            <Pagination>
                {pageList.map((item)=>{
                    if(item === currentPage){
                        return(
                            <CurrentPageButton onClick={()=>{window.scrollTo(0, 0);setCurrentPage(item);}}>{item}</CurrentPageButton>
                        )
                    }
                    else{
                    return(
                    <PageButton onClick={()=>{window.scrollTo(0, 0);setCurrentPage(item);}}>{item}</PageButton>
                    )
                    }
                })}

            </Pagination>}
            </ContentList>:<p>로그인이 필요한 기능입니다.</p>}
        </Container>
    )

}

export default TravelListHeart;