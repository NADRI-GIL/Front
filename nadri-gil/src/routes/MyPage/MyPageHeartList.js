import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "../../index.css"
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { getHeart, postHeart} from "../../api.js"
import { useMutation } from "react-query";

import { loginIdAtom } from "../../atom.js"
import { useRecoilValue } from "recoil";

const Container = styled.div`
h3{font-family: 'SUIT';}
p{font-family: 'SUIT';}
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
const CompleteButton = styled.button`
float:right;
font-family: 'SUIT';
box-sizing: border-box;
background-color:#3366ff;
color:#ffffff;
border:none;
border-radius: 10px;
height: 6vh;
font-size:0.8vw;
padding:0 7vh 0 7vh;
margin:auto;
margin-top:2vh;
`
const HeartImage = styled.div`
position:absolute;

`
function MyPageHeartList(){
    const loginId = useRecoilValue(loginIdAtom)
    const [heartData, setHeartData] = useState([]);
    let navigate = useNavigate();

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
    const { mutate:deleteMutate, isLoading:isDeleteLoading } = useMutation(postHeart, {
        onSuccess: data => {
            if (data.resultCode === 0) {
                alert('삭제되었습니다.')
                mutate({"loginId":loginId})
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

    const onClinkDeleteHeart = (travelId, travelName) => {
        if(window.confirm(`"${travelName}"을 삭제하시겠습니까?`)){
            deleteMutate({"loginId":loginId, "travelId":travelId})
        }  
    }
    return(
        <Container>
        <h3>찜한 여행지</h3>
        <Hr></Hr>
        <ContentList>
                
                {heartData?.length === 0 ?
                <div>
                <p>아직 찜한 여행지가 없습니다.</p>
                <CompleteButton type='button' onClick={()=>navigate('/travelList')}>여행지 보러가기 -&gt;</CompleteButton>
                </div>
                :
                heartData.map((item) => {
                    return (
                        <Content>
                            <HeartImage>
                            <AiFillHeart onClick={()=>{onClinkDeleteHeart(item.travelId, item.name)}} size="30" color="red" style={{cursor:'pointer'}}className="bookmarkFillIcon" />
                            </HeartImage>
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