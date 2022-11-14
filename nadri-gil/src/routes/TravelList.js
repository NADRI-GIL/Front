import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../index.css"
import { Link } from 'react-router-dom';

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
margin: 7vh 0 20vh 0;
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
const Sort = styled.div`
font-family: 'SUIT';
margin:0 0.3vw 0 0.3vw;
cursor:pointer;
color:#868686;
`

function TravelList() {
    const { isLoading, data, isFetching } = useQuery("travelData", getTravelsAll, {
        cacheTime: Infinity,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: data => {
            // 성공시 호출
            setTravelList(data.list)
            console.log(data);
        },
        onError: e => {
            // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
            // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
            console.log(e.message);
        }
    });


    const OPTIONS = ['경기', '경북', '경남', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '강원',
        '충북', '충남', '전북', '전남', '제주'];

    const [travelList, setTravelList] = useState([]);
    const [fieldValue, setFieldValue] = useState([]);
    const [selectState, setSelectState] = useState(false);
    const [limit, setLimit] = useState(24);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageList, setPageList] = useState([1, 2, 3, 4, 5])
    const offset = (currentPage - 1) * limit;

    const selectedData = (field) => {
        if (fieldValue.indexOf(field) === -1) {
            let tmp = [...fieldValue]
            tmp.push(field)
            setFieldValue([...tmp])
            let tmpdata = data.list.filter((e) => tmp.indexOf(e.location) != -1)
            setTravelList([...tmpdata])
        }

    }
    const deleteData = (index) => {
        let tmp = [...fieldValue]
        tmp.splice(index, 1)
        setFieldValue([...tmp])
        let tmpdata = data.list.filter((e) => tmp.indexOf(e.location) != -1)
        setTravelList([...tmpdata])
        if (tmp.length === 0) {
            setTravelList(data.list)
        }
    }
    const previousPageList = () => {
        window.scrollTo(0, 0);
        let tmp = pageList.map((item) => item - 5)
        setPageList([...tmp])
        setCurrentPage(tmp[0])
    }
    const nextPageList = () => {
        window.scrollTo(0, 0);
        let tmp = pageList.map((item) => item + 5)
        setPageList([...tmp])
        setCurrentPage(tmp[0])
        
    }
    const sortData = (index) => {
        let tmp = [...travelList]
        if (index === 1) tmp.sort((a, b) => a.id - b.id)
        else if (index === 2) tmp.sort((a, b) => b.likeCount - a.likeCount)
        else if (index === 3) tmp.sort((a, b) => b.reviewTotal - a.reviewTotal)
        setTravelList(tmp)
        setCurrentPage(1)
        setPageList([1, 2, 3, 4, 5])
    }
    useEffect(() => {
        if (data && travelList.length === 0) {
            setTravelList(data.list)
        }
        console.log(travelList)

    }, [travelList])

    return (
        <Container>
            <SelectContainer>
                <Select onClick={() => { setSelectState(!selectState) }}>지역</Select>
                {fieldValue.map((item, index) => {
                    return (
                        <Selected onClick={() => deleteData(index)} style={{ margin: '0 0 0 0.5vw' }}>{item}</Selected>
                    )
                })}

                {selectState ?

                    <div>
                        <Hr></Hr>
                        {OPTIONS.map((item) => {
                            return (
                                <Select onClick={() => selectedData(item)} style={{ margin: '0.5vh 0.5vw 0 0' }}>{item}</Select>
                            )
                        })}
                    </div> : ''}
            </SelectContainer>
            <div style={{ display: "flex", float: "right" }}>
                <Sort onClick={() => sortData(1)}>최신순</Sort>
                <Sort onClick={() => sortData(2)}>하트순</Sort>
                <Sort onClick={() => sortData(3)}>별점순</Sort>
            </div>
            <ContentList>

                {travelList.length === 0 ? 'loading...' : travelList.slice(offset, offset + limit).map((item) => {
                    return (
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
                })
                }
                {isLoading ?
                    ''
                    :
                    <Pagination>
                        {currentPage > 5 ? <PageButton onClick={previousPageList}>&lt;</PageButton> : ''}
                        {pageList.map((item) => {
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
                        <PageButton onClick={nextPageList}>&gt;</PageButton>
                    </Pagination>}
            </ContentList>
        </Container>
    )

}

export default TravelList;