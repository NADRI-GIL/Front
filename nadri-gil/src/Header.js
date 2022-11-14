import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoginedAtom, loginIdAtom } from './atom';
import "./Header.css";
import {FiSearch} from 'react-icons/fi';



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
                    <h1><Link style={{color:"black"}} to="/" onClick={()=>setSearch('')}>나드리길</Link></h1>
                </div>
                <ul>
                <li><Link to="/travelList" onClick={()=>setSearch('')}>지역</Link></li>
                <li><Link to="/travelListHeart" onClick={()=>setSearch('')}>인기</Link></li>
                <li><Link to="/" onClick={()=>setSearch('')}>코스</Link></li>
                <li><Link to="/Notice" onClick={()=>setSearch('')}>공지사항</Link></li>
            </ul>
            
            <div className="search">
  <input type="text" value={search} onChange={(v)=>setSearch(v.target.value)} placeholder="검색어 입력"/>
  <FiSearch onClick={()=>navigate(`/Search/${search}`)} size="30" className="search_button" /> 
  </div></div>
                {isLogined ?
                    <ul>
                        <li><Link to="/mypage/mypageinfo" onClick={()=>setSearch('')}>마이페이지</Link></li>
                        <div onClick={()=>{onClickLogOut();  setSearch('');}}>
                        <li>로그아웃</li>
                        </div>
                    </ul>
                    :
                    <ul>
                        <Link to="/signIn" onClick={()=>setSearch('')}>
                        <li style={{color:"black"}}>로그인</li>
                        </Link>
                    </ul>}
            </nav>
            </header>
            <hr></hr>
            <Outlet />
        </div>
    );
};

export default Header;