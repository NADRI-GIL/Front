import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "../../index.css"

import { postUserReview } from "../../api.js"
import { useMutation } from "react-query";

import { isLoginedAtom, loginIdAtom } from "../../atom.js"
import { useRecoilValue } from "recoil";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faPencilSquare, faTrash } from "@fortawesome/free-solid-svg-icons";


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
// display:flex;
flex-wrap:wrap;
width:100%;
margin:auto;
margin-top:3vh;
`
const Content = styled.div`
// margin-top:1vh;
width:100%;
// height:22vh;
padding:5px;
// text-align:center;
color:black;

    img{
        object-fit: contain;
        height:10vh;
        // overflow: hidden;
        width:15%;
    }
`;
const Title = styled.p`
margin:auto 0 0 0.5vw;
font-family: 'SUIT';
font-size:1vw;
`
const Name = styled.p`
font-size:0.8vw;
font-family: 'SUIT';
padding:0.6vw;
margin:0;
`
const StyledLink = styled(Link)`
	color:black;
`;
function MyPageReview() {
    const loginId = useRecoilValue(loginIdAtom)
    const [reviewData, setReviewData] = useState([]);
    const { mutate, isLoading } = useMutation(postUserReview, {
        onSuccess: data => {
            if (data.resultCode === 0) {
                console.log(data.list)
                setReviewData(data.list)
            }
            else {
                alert(data.resultMsg)
            }
        },
        onError: () => {
            alert("there was an error")
        },

    });

    useEffect(() => {
        mutate({ "loginId": loginId })
    }, [])



    return (
        <Container>
            <h3>내가 적은 리뷰</h3>
            <Hr></Hr>
            <ContentList>
                {reviewData?.map((item) => {
                    return (
                        <Content>

                            <StyledLink to={`/TravelDetail/${item.travelId}`}>
                                <div style={{ display: 'flex' }}>
                                    <Title>{item.travelName}</Title>
                                    <Title>{[1, 2, 3, 4, 5].map(el => (
                                        <FontAwesomeIcon icon={faStar} style={{ color: el <= item.star ? '#ffda38' : '#b9b9b9' }} />
                                    ))}</Title>
                                    <Title>{item.createdDate}</Title>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    {item.image === '' ? '' : <img src={item.image}></img>}
                                    <Name>{item.content}</Name>
                                </div>
                            </StyledLink>
                            <Hr></Hr>
                        </Content>

                    )
                })
                }
            </ContentList>
        </Container>
    )

}
export default MyPageReview;