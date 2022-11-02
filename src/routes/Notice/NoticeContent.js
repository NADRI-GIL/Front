import React, {useContext, useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AiOutlineHeart, AiFillStar, AiFillHeart, AiFillFilter} from 'react-icons/ai';
import {  BsCartPlus,BsCartPlusFill  } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";


const Container = styled.div`
    width:60%;
    margin:auto;
`;


const Content = styled.div`
text-align:center;
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
    
    return(
        <Container>      
         {/* {data.map((e)=> {
          return(   */}
        <Content>
            <h3>{state.title}</h3>
            <h7>{state.register_date}</h7>
        </Content>
        <Content>
            <h7>{state.content}</h7>
        </Content>
        <Bottom>

        </Bottom>
        {/* )
    })}  */}
    </Container>

    )
};

export default NoticeContent;