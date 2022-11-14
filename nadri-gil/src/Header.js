import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoginedAtom, loginIdAtom } from './atom';
import "./Header.css";
import { FiSearch } from 'react-icons/fi';
import styled from "styled-components";
const Footer = styled.div`
    padding:1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    background-color: rgb(245,245,245);
    margin-top:15vh;
    padding-bottom:15vh;
`;
const Foot = styled.div`
    width:63%;
`;
const FooterTop = styled.div`
    display: flex;
    
`;
const FooterMiddle = styled.div`
    // padding-top:5vh;
    padding-bottom:5vh;
    border-bottom: 1px solid lightgray;
    h5{ 
        margin:0;
        // padding-top:1vh;
        margin-left:2vw;
        font-weight: 600;
        font-size:0.7vw;
        color:darkgray;
    }
`;
const FooterBottom = styled.div`
    margin-top: 1vh;
    h5{ 
        margin:0;
        padding-top:1vh;
        margin-left:2vw;
        font-weight: 600;
        font-size:0.7vw;
        color:darkgray;
    }
`;
const FooterContest = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    h4{
        display: inline;
        margin-left:2vw;
        font-weight: 600;
        font-size:0.7vw;
        color:darkgray;
    }
`;

const FooterLogo = styled.div``;

const Header = () => {
    let navigate = useNavigate();
    const [search, setSearch] = useState('')
    const isLogined = useRecoilValue(isLoginedAtom);
    const setIsLoginedFn = useSetRecoilState(isLoginedAtom);
    const setLoginIdFn = useSetRecoilState(loginIdAtom);
    const onClickLogOut = () => {
        setIsLoginedFn(false);
        setLoginIdFn("");
        navigate('/')
    }


    return (
        <div>
            <header>
                <nav>
                    <div className="group">
                        <div>
                            <h1><Link style={{ color: "black" }} to="/" onClick={() => setSearch('')}>나드리길</Link></h1>
                        </div>
                        <ul style={{height:'100%'}}>
                            <li><Link to="/travelList" onClick={() => setSearch('')}>지역</Link></li>
                            <li><Link to="/travelRecommendList" onClick={() => setSearch('')}>추천</Link></li>
                            <li><Link to="/course" onClick={() => setSearch('')}>코스</Link></li>
                            <li><Link to="/Notice" onClick={() => setSearch('')}>공지사항</Link></li>
                        </ul>

                        <div className="search">
                            <input type="text" value={search} onChange={(v) => setSearch(v.target.value)} placeholder="검색어 입력" />
                            <FiSearch onClick={() => navigate(`/Search/${search}`)} size="30" className="search_button" />
                        </div></div>
                    <div style={{ display: 'flex', width: '30%', alignContent: 'center', textAlign: 'center' }}>
                        {isLogined ?
                            <ul style={{ margin: '0 0 0 auto' }}>
                                <li><Link to="/mypage/mypageinfo" onClick={() => setSearch('')}>마이페이지</Link></li>
                                <div onClick={() => { onClickLogOut(); setSearch(''); }}>
                                    <li>로그아웃</li>
                                </div>
                            </ul>
                            :
                            <ul style={{ margin: '0 0 0 auto' }}>
                                <li style={{ color: "black" }}><Link to="/signIn" onClick={() => setSearch('')} style={{ alignContent: 'center' }}>로그인</Link></li>
                            </ul>}
                    </div>
                </nav>
            </header>
            <hr></hr>
            <Outlet />
            <Footer>
                <Foot>
                    <FooterTop>
                        <FooterLogo>
                            <img style={{ width: "100%", height: "100%", objectFit: "fill" }} src="https://user-images.githubusercontent.com/44117975/190621512-54a2e02e-f0c3-4a6e-8243-6201ea2ee52d.PNG" alt="jjowinLogo"></img>
                        </FooterLogo>
                        <FooterContest><h4>여행지 추천 서비스</h4><h4>https://github.com/NADRI-GIL</h4></FooterContest>
                    </FooterTop>
                    <FooterMiddle>
                        <h5>창업파일럿 프로젝트 01-09팀</h5>
                        <h5>구본영 : wjqthrtk1905@naver.com</h5>
                        <h5>김은서 : qnrqjrm03@naver.com</h5>
                        <h5>허다은 : qor_4@naver.com</h5>
                    </FooterMiddle>
                    <FooterBottom>
                        <h5>®주식회사메이켄 All rights reserved</h5>
                    </FooterBottom>
                </Foot>
            </Footer>
        </div>
    );
};

export default Header;