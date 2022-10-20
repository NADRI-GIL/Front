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
const Select = styled.select`
    width: 4vw;
    height: 5vh;
    border: none;
    font-size:15px;
    border-radius: 20px;
    background-color:#c8d6ff;
    color:#3366ff;
    text-align-last: center;
    text-align: center;
`;

function TravelList() {
    const {isLoading, data} = useQuery("travelData", getTravelsAll, {
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
    const OPTIONS = [
        { value: false, name:'선택'},
        { value: "개발", name: "개발" },
        { value: "디자인", name: "디자인" },
        { value: "과학", name: "과학" },
    ];
    const [travelList,setTravelList] = useState(data);
    const [fieldValue, setFieldValue] =useState(false);

    const SelectBox = (props) => {
        const handleChange = (e) => {
            setFieldValue(e.target.value);
            let value = e.target.value 
            if(value!=="false"){
                let tmp = travelList.filter((e)=>e.field === value)
                console.log(tmp)
                setTravelList(tmp)
            }
            else setTravelList(data)
        };
        return (
            <Select onChange={handleChange} value={fieldValue}>
                {props.options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        // defaultValue={props.defaultValue === option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </Select>  
        );
    };

    return (
        <Container>
            <SelectBox options={OPTIONS} defaultValue={false}></SelectBox>
            <ContentList>
                
                {isLoading?'loading...':travelList.map((item) => {
                    return (
                        <Content>
                            <a href="">
                                <img src={item.image}></img>
                                <p>{item.name}</p>
                            </a>
                        </Content>
                    )
                })
                }
            </ContentList>
        </Container>
    )

}

export default TravelList;