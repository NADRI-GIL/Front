import React, { useContext, useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { isElementOfType } from 'react-dom/test-utils';

const Container = styled.div`
    width:60%;
    margin:0 auto;
    font-family : 'SUIT';
    text-align: center;
    button{
        position: relative;
        border: none;
        display: inline-block;
        padding: 15px 30px;
        border-radius: 15px;
        color: white;
        text-decoration: none;
        font-weight: 600;
        background-color:#3366ff; 
    }
`
const Content = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
    align-items: center;
    input{
      border-radius : 10px;
      width: 70%;
      background-color: rgb(225 225 225);
      border: none;
      outline: none;
    }
    
    textarea{
        border-radius : 10px;
        margin-top: 10px;
        width: 70%;
        outline: none;
        border-color:  rgb(225 225 225);
        // border: 12px;
      }
`
const Hr = styled.hr`
border:2px;
height:2px;
margin:1vh 0 1vh 0;
background-color:rgb(225 225 225);
margin-top: 10px;
`

function NoticeWrite() {

  return (
    <Container>
        <Content>
        <h5>제목</h5>
      <input style={{height: '50px'}} placeholder='제목' type="text"></input>
    </Content>
    <Hr/>
    <Content>
    <h5>내용</h5>
      <textarea style={{height:'350px'}}  placeholder='내용' ></textarea>
      </Content>
    <Hr/>
      <button>제출</button>
    </Container>

  )

}

export default NoticeWrite;
