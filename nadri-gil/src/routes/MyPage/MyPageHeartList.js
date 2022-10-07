import { useState } from "react";
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import "../../index.css"

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
function MyPageHeartList(){
    return(
        <Container>
        <h3>찜한 여행지</h3>
        <Hr></Hr>

        </Container>
    )

}
export default MyPageHeartList;