import React, { useState } from "react";
// import Seoul from './seoul.js'
// import AA from './sign-up'
import Main from './Main';
import ItemList from './ItemList'

import styled from "styled-components";

const Side = styled.div`
width: 15%;
  padding: 20px;
`;
const Content = styled.div`
width: 80%;
  padding: 20px;
`;

const Button = styled.button`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #03c75a;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
  `}
`;


function Sidebar() {
  const [content, setContent] = useState('서울');

  const menus = [
    { name: "서울", path: "/" },
    { name: "부산", path: "/" },
    { name: "제주", path: "/" },
    { name: "경기", path: "/" },
    { name: "인천", path: "/" },
    { name: "강원", path: "/" },
    { name: "경상", path: "/" },
    { name: "전라", path: "/" },
    { name: "충청", path: "/" }
  ];
  const buttonValueSetting = e => {
    const { name } = e.target;
    setContent(name);
  };
  const selectComponent = {
    서울: <ItemList />,
    부산: <Main />,
    제주: <ItemList />,
    경기: <ItemList />,
    전라: <ItemList />,
  };
  return (
    <div className="sidebar"  style={{display: 'flex'}} >
      <Side>
      {menus.map((menu) => {
        return (
          <div className="sidebar-item">
            <Button onClick={buttonValueSetting} name={menu.name}>
              {menu.name}
            </Button>
          </div>
        );
      })}
      </Side>
      <Content>
      {content && selectComponent[content]}
      </Content>
    </div>
  );
}

export default Sidebar;