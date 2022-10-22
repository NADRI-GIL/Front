import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../index.css"


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
function TravelList() {
    const { isLoading, data } = useQuery("travelData", getTravelsAll, {
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

    // const data = [
    //     {
    //         "id": 1,
    //         "name": "여행지 명1",
    //         "location": "지역(분류)",
    //         "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
    //     },
    //     {
    //         "id": 2,
    //         "name": "여행지 명2",
    //         "location": "지역(분류)",
    //         "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
    //     },
    //     {
    //         "id": 3,
    //         "name": "여행지 명3",
    //         "location": "지역(분류)",
    //         "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
    //     },
    //     {
    //         "id": 4,
    //         "name": "여행지 명4",
    //         "location": "지역(분류)",
    //         "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
    //     },
    //     {
    //         "id": 1,
    //         "name": "여행지 명1",
    //         "location": "지역(분류)",
    //         "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
    //     },
    //     {
    //         "id": 2,
    //         "name": "여행지 명2",
    //         "location": "지역(분류)",
    //         "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
    //     },
    //     {
    //         "id": 3,
    //         "name": "여행지 명3",
    //         "location": "지역(분류)",
    //         "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
    //     },
    //     {
    //         "id": 4,
    //         "name": "여행지 명4",
    //         "location": "지역(분류)",
    //         "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
    //     }, {
    //         "id": 1,
    //         "name": "여행지 명1",
    //         "location": "지역(분류)",
    //         "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
    //     },
    //     {
    //         "id": 2,
    //         "name": "여행지 명2",
    //         "location": "지역(분류)",
    //         "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
    //     },
    //     {
    //         "id": 3,
    //         "name": "여행지 명3",
    //         "location": "지역(분류)",
    //         "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
    //     },
    //     {
    //         "id": 4,
    //         "name": "여행지 명4",
    //         "location": "지역(분류)",
    //         "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
    //     }
    // ]
    const OPTIONS = ['경기', '경북', '경남', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '강원',
        '충북', '충남', '전북', '전남', '제주'];

    const [travelList, setTravelList] = useState(data);
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
    const previousPageList=()=>{
        let tmp = pageList.map((item)=> item-5)
        setPageList([...tmp])
        setCurrentPage(tmp[0])
    }
    const nextPageList=()=>{
        let tmp = pageList.map((item)=> item+5)
        setPageList([...tmp])
        setCurrentPage(tmp[0])

    }

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
            <ContentList>

                {isLoading ? 'loading...' : travelList.slice(offset, offset+limit).map((item) => {
                    return (
                        <Content>
                            <a href={`/TravelDetail/${item.id}`}>
                                <img src={item.image}></img>
                                <p>{item.name}</p>
                            </a>
                        </Content>
                        
                    )
                })
                }
                {isLoading?
                ''
            :
            <Pagination>
                {currentPage>5?<PageButton onClick={previousPageList}>&lt;</PageButton>:''}
                {pageList.map((item)=>{
                    if(item === currentPage){
                        return(
                            <CurrentPageButton onClick={()=>setCurrentPage(item)}>{item}</CurrentPageButton>
                        )
                    }
                    else{
                    return(
                    <PageButton onClick={()=>setCurrentPage(item)}>{item}</PageButton>
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