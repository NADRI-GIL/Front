import React, { useState, useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
    width:50%;
    margin:0 auto;
    font-family : 'SUIT';

  border-spacing: 0;
    button{
        position: relative;
        border: none;
        display: inline-block;
        float : right;
        padding: 10px 20px;
        margin-top: 20px;
        border-radius: 15px;
        color: white;
        text-decoration: none;
        font-weight: 600;
        background-color:#3366ff; 
    }
`
const Hr = styled.hr`
border:1px;
height:2px;
margin:1vh 0 1vh 0;
background-color:rgb(225 225 225);
margin-top: 10px;
`
const Content = styled.div`
    margin-top: 20px;
    align-items: center;

    ul{
      justify-content: space-between;
    }

    a{
      color: black;
    }
`

const Thead = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
  justify-content: space-between;

  th{
    border-bottom: none;
  }


`

const Tbody = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding : 7px 7px;

  :hover {
    background-color: #eceaea;
    cursor: pointer;
  }

  a {
    color: black;
  }
`

function Notice(){
    const navigate = useNavigate();
 
    const navigateToPurchase = () => {
      navigate("/Notice/NoticeWrite");
    };

    return(
      <>
      <Container>
        <h3 style={{textAlign:"left "}}>공지사항</h3>
        <Thead>
            <th>글번호</th>
            <th>제목</th>
            <th>등록일</th> 
        </Thead>
        <Hr/>
           {/* {data.map((e)=> {
          return(  */}
            <Tbody>
            <td>1</td>
            <Link to ="../Notice/NoticeContent" ><td>나드리길 이용방법</td></Link>
            <td>2022.11.01</td>
            </Tbody>
            {/* )
            })} */}
           <button  onClick={navigateToPurchase}>작성하기</button>
      </Container>
    </>
    )

}

export default Notice;

