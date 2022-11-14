import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import styled from "styled-components";

import { AiFillStar, AiFillHeart } from 'react-icons/ai';


import { getTravelsAll } from "../api.js"
import { useQuery } from "react-query";

const Container = styled.div`
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
width:25%;
// height:25vh;
margin-bottom:2vh;
padding:5px;

// text-align:center;
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
        margin:0;
        font-weight:500;
    }
    span{
        font-family: 'SUIT';
        font-size:0.95em;
        margin-left:0.2vw;
    }
`;
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
const Search = () => {
    let {search} = useParams();
    const [travelList, setTravelList] = useState([]);

    const [limit, setLimit] = useState(24);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageList, setPageList] = useState([])
    const offset = (currentPage - 1) * limit;

    const { isLoading, data, isFetching } = useQuery("travelData", getTravelsAll, {
        cacheTime: Infinity,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: data => {
            // 성공시 호출
            setTravelList(data.list.filter((e)=> e.name.includes(search)))
            let tmp = new Array(Math.ceil(data.list.filter((e)=> e.name.includes(search)).length / 24)).fill(0)
            tmp.forEach((e, i)=>tmp[i] = i+1)
            setPageList(tmp)

        },
        onError: e => {
            // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
            // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
            console.log(e.message);
        }
    });
    useEffect(() => {
        if (data && travelList.length === 0) {
            setTravelList(data.list.filter((e)=> e.name.includes(search)))
            let tmp = new Array(Math.ceil(data.list.filter((e)=> e.name.includes(search)).length / 24)).fill(0)
            tmp.forEach((e, i)=>tmp[i] = i+1)
            setPageList(tmp)
        }

    }, [travelList])

    useEffect(() => {
        if (data && travelList) {
            setTravelList(data.list.filter((e)=> e.name.includes(search)))

            let tmp = new Array(Math.ceil(data.list.filter((e)=> e.name.includes(search)).length / 24)).fill(0)
            tmp.forEach((e, i)=>tmp[i] = i+1)
            setPageList(tmp)
        }
    }, [search])
    return (
        <Container>
            <ContentList>
            {isLoading?'여행지를 불러오는 중입니다.':''}
            {!isLoading && travelList.length===0?'검색한 여행지를 찾을 수 없습니다.':''}
            {travelList.slice(offset, offset + limit).map((item)=>{
                return(
                    <Content>
                            <a href={`/TravelDetail/${item.id}`} target='_blank' rel='noreferrer'>
                                <img src={item.image}></img>
                                <div style={{ display: 'flex' , justifyContent:'space-between', width:'98%', margin:'0.5vh auto'}}>
                                <p style={{color:'#3366ff'}}>{item.location}</p>
                                <div style={{ display: 'flex' , alignItems:'center'}}>
                                    <div style={{ display: 'flex' , alignItems:'center'}}>
                                        <AiFillStar color='#ffda38' size='20'></AiFillStar><span>{item.reviewTotal.toFixed(1)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems:'center', marginLeft:'0.3vw' }}>
                                        <AiFillHeart color='red' size='20'></AiFillHeart><span>{item.likeCount}</span>
                                    </div>
                                    </div>
                                    
                                </div>
                                <div style={{ width:'98%', margin:'auto'}}>
                                <p>{item.name}</p>
                                </div>
                            </a>
                        </Content>
                )
            })}
            <Pagination>
                        {currentPage > 5 ? <PageButton onClick={()=>{window.scrollTo(0, 0); setCurrentPage((parseInt((currentPage-1)/5)*5)-4);}}>&lt;</PageButton> : ''}
                        {pageList.slice((parseInt((currentPage-1)/5)*5), (parseInt((currentPage-1)/5)*5)+5).map((item) => {
                            if (item === currentPage) {
                                return (
                                    <CurrentPageButton onClick={() => { window.scrollTo(0, 0); setCurrentPage(item); }}>{item}</CurrentPageButton>
                                )
                            }
                            else {
                                return (
                                    <PageButton onClick={() => { window.scrollTo(0, 0); setCurrentPage(item); }}>{item}</PageButton>
                                )
                            }
                        })}
                        {pageList.length > 5 && currentPage <= (parseInt(pageList.length/5))*5? <PageButton onClick={()=>{window.scrollTo(0, 0); setCurrentPage((parseInt((currentPage-1)/5)*5)+6);}}>&gt;</PageButton> : ''}
                    </Pagination>
            </ContentList>
        </Container>
    );
};

export default Search;