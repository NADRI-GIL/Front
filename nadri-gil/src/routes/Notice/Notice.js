// import React, { useState, useEffect } from 'react';
// import {Link } from 'react-router-dom';
// import styled from "styled-components";

// const Container = styled.div`
//     width:60%;
//     margin:0 auto;
//     text-align: center;
//     button{
//         position: relative;
//         border: none;
//         display: inline-block;
//         padding: 15px 30px;
//         border-radius: 15px;
//         color: white;
//         text-decoration: none;
//         font-weight: 600;
//         background-color:#3366ff; 
//     }
// `
// const Hr = styled.hr`
// border:1px;
// height:2px;
// margin:1vh 0 1vh 0;
// background-color:rgb(225 225 225);
// margin-top: 10px;
// `
// const Content = styled.div`
//     margin-top: 20px;
//     align-items: center;

//     ul{
//       justify-content: space-between;
//     }

//     a{
//       color: black;
//     }

// `

// function Notice(){
//     const data=[
//       {notice_id:1, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },
//       {notice_id:2, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },
//       {notice_id:3, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },
//       {notice_id:4, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },
//       {notice_id:5, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },

//     ]

//     return(
//      <Container>
//       <h3 style={{textAlign:"left "}}>공지사항</h3>
//       <Content>
//         <ul><li>제목</li><div style={{display: "flex"}}><li>작성자</li><li> 등록일</li></div></ul>
//           {data.map((e)=> {
//           return( 
//             <div>
//             <ul>
//       <li style={{textAlign:"left "}}>
//        <Link to ="../Notice/NoticeContent" state={e} >{e.tag}  {e.title} </Link>
//       </li>
//       <li>{e.user_id}  {e.register_date}</li>
//       </ul>
//       <Hr/>
//       </div>
//         )
//       })}
//       </Content>
//  </Container>
//     )

// }

// export default Notice;


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
    const data=[
      {notice_id:1, user_id: 1,register_date:20220208 ,title:"첫번째 게시글입니다.", content :"내용" , tag: "중요"  },
      {notice_id:2, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },
      {notice_id:3, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },
      {notice_id:4, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },
      {notice_id:5, user_id: 1,register_date:20220208 ,title:"제목", content :"내용" , tag: "중요"  },

    ]

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
           {data.map((e)=> {
          return( 
            <Tbody>
            <td>{e.notice_id}</td>
            <Link to ="../Notice/NoticeContent" state={e} ><td> {e.tag}{e.title}</td></Link>
            <td>{e.register_date}</td>
            </Tbody>
            )
            })}
           <button  onClick={navigateToPurchase}>작성하기</button>
      </Container>
    </>
    )

}

export default Notice;

