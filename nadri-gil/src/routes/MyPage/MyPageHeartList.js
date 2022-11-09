import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "../../index.css"

import { getHeart} from "../../api.js"
import { useMutation } from "react-query";

import { loginIdAtom } from "../../atom.js"
import { useRecoilValue } from "recoil";

const Container = styled.div`
h3{font-family: 'SUIT';}
width:100%;
padding-left:2vw;
`
const Hr = styled.hr`
border:0;
height:2px;
background-color:#f4f4f4;
`
const ContentList = styled.div`
display:flex;
flex-wrap:wrap;
width:100%;
margin:auto;
margin-top:3vh;
`
const Content = styled.div`
width:23.5%;
height:20vh;
padding:5px;
text-align:center;
    img{
        object-fit: cover;
        height:15vh;
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
function MyPageHeartList(){
    const loginId = useRecoilValue(loginIdAtom)
    const [heartData, setHeartData] = useState([]);

    const { mutate, isLoading } = useMutation(getHeart, {
        onSuccess: data => {
            console.log(data);
            if (data.resultCode === 0) {
                setHeartData(data.list)
            }
            else {
                alert(data.resultMsg)
            }
        },
        onError: () => {
            alert("there was an error")
        },

    });

    useEffect(()=>{
        mutate({"loginId":loginId})
    }, [])
    
    return(
        <Container>
        <h3>찜한 여행지</h3>
        <Hr></Hr>
        <ContentList>
                
                {heartData?.map((item) => {
                    return (
                        <Content>
                            <Link to={`/TravelDetail/${item.travelId}`}>
                                <img src={item.image}></img>
                                <p>{item.name}</p>
                            </Link>
                        </Content>
                    )
                })
                }
            </ContentList>
        </Container>
    )

}
export default MyPageHeartList;