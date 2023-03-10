import React, {useContext, useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AiOutlineHeart, AiFillStar, AiFillHeart, AiFillFilter} from 'react-icons/ai';
import {  BsCartPlus,BsCartPlusFill  } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
// import poster from '../public/img/notice_poster1.png';

const Container = styled.div`
    width:50%;
    margin:auto;
`;


const Content = styled.div`
text-align:center;
margin-bottom: 40px;
    img{
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

const Bottom = styled.div`
    width:60%;
    margin:auto;
`;


function NoticeContent(){

    const location = useLocation();
    const state = location.state;

    const data=[
        {notice_id:1, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },
        {notice_id:2, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },
        {notice_id:3, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },
        {notice_id:4, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },
        {notice_id:5, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },
    ]
    const data1 = [
        {notice_id:1, img : 'img/banner1.png'}
      ]
    
    return(
        <Container>      
         {/* {data.map((e)=> {
          return(   */}
        <Content>
            {/* <h3>나드리길 이용방법</h3> */}
        </Content>
        <Content>
          <img src ='https://user-images.githubusercontent.com/63081612/201750087-d0603e8d-96f5-4578-b94f-969ba4cb7fe6.png'></img>
        </Content>
        <Bottom>

        </Bottom>
        {/* )
    })}  */}
    </Container>

    )
};

export default NoticeContent;