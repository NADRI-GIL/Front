import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoginedAtom, loginIdAtom } from './atom';
import "./Header.css";
import {FiSearch} from 'react-icons/fi';



const Header = () => {
    let navigate = useNavigate();
    const isLogined = useRecoilValue(isLoginedAtom);
    const setIsLoginedFn = useSetRecoilState(isLoginedAtom);
    const setLoginIdFn = useSetRecoilState(loginIdAtom);
    const onClickLogOut = () => {
        setIsLoginedFn(false);
        setLoginIdFn("");
    }


    return (
        <div>
           <header>
            <nav>
                <div className="group">
                <div>
                    <h1><a style={{color:"black"}} href="./">나드리길</a></h1>
                </div>
                <ul>
                <li><a href="./travelList">지역</a></li>
                <li><a href="./">인기</a></li>
                <li><a href="./">코스</a></li>
                <li><a href="./Notice">공지사항</a></li>
            </ul>
            
            <div className="search">
  <input type="text" placeholder="검색어 입력"/>
  <FiSearch size="30" className="search_button" /> 
  </div></div>
                {isLogined ?
                    <ul>
                        <li><a href="./mypage/mypageinfo">마이페이지</a></li>
                        <div onClick={onClickLogOut}>
                        <li>로그아웃</li>
                        </div>
                    </ul>
                    :
                    <ul>
                        <Link to="/signIn">
                        <li>로그인</li>
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