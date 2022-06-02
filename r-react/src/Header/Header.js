import { render } from '@testing-library/react';
import React, {useEffect, useState, useRef } from 'react';
import C_header from './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row, Container } from 'react-bootstrap';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { BsFillCartPlusFill, BsPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import classnames from 'classnames';


const useDetectOutsideClick = (el, initialState) => {
    const [isActive, setIsActive] = useState(initialState);
  
    useEffect(() => {
      const onClick = (e) => {
        // If the active element exists and is clicked outside of
        if (el.current !== null && !el.current.contains(e.target)) {
          setIsActive(!isActive);
        }
      };
  
      // If the item is active (ie open) then listen for clicks outside
      if (isActive) {
        window.addEventListener("click", onClick);
      }
  
      return () => {
        window.removeEventListener("click", onClick);
      };
    }, [isActive, el]);
  
    return [isActive, setIsActive];
  };
  
  
const Logo =()=>{

    const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  
        return (
            <Container fluid className="header_top">
                <Row>
                    <Col lg={3} className ="header-logo">
                    <img className="logo" src="./image/logo1.png" alt="Second slide"/>
                    </Col>
                    <Col lg={6} className ="header-search">
                        <input className ="search" type="text" />
                        <button className="Fasearch"><AiOutlineSearch size="30"/></button>
                    </Col>
                    <Col lg={3} className="etc">
                        {/* <Container fluid>
                            <Row>
                                <Col md={4}>
                                <button className="cart"><BsFillCartPlusFill size="50" color="black"/></button>
                                </Col>
                                <Col md={4}>
                                <button className="mypage"><BsPersonFill size="50" color="black"/></button>
                                </Col>
                            </Row>
                        </Container> */}
                            <ul className="etc_button">
                                <li><a className="cart" href="#"><BsFillCartPlusFill size="40" color="black"/></a></li>                               
                                <li><button onClick={onClick}  className="mypage" ><AiOutlineUser size="40" color="black"/></button></li>
                                <ul ref={dropdownRef} className={`H_login ${isActive ? 'active' : 'inactive'}`} >
                                    <li><a>회원가입</a></li>
                                    <li><a>로그인</a></li>
                                </ul>
                            </ul>
                           

                    </Col>
                </Row>
            </Container>
        )
    }


class Menu extends React.Component{
    render(){
        return(
                    <nav className="main-menu">
                        <ul>
                            <li ><a href="">지역</a></li>
                            <li ><a href="">카테고리</a></li>
                            <li ><a href="#">인기</a>
                                <ul className="sub-menu2">
                                    <li><a  href="">서브메뉴</a></li>
                                    <li><a  href="">서브메뉴</a></li>
                                    <li><a  href="">서브메뉴</a></li>
                                </ul>
                            </li>
                            <li><a href="">코스</a></li>
                            <Link to = "../Notice"><li><a href="">공지사항</a></li></Link>
                        </ul>
                    </nav>
        )
    }
}


class Header extends React.Component {
    render(){
        return(
            <div className ="app-Header">
                <Link to ="/">
                <useDetectOutsideClick/>
                <Logo/>
                </Link>
                <Menu/>
            </div>
        );
    }
}
export default Header;