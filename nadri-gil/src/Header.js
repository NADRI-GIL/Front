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
        navigate('/')
    }


    return (
        <div>
           <header>
            <nav>
                <div className="group">
                <div>
                    <h1><Link style={{color:"black"}} to="/">나드리길</Link></h1>
                </div>
                <ul>
                <li><Link to="/travelList">지역</Link></li>
                <li><Link to="/travelListHeart">인기</Link></li>
                <li><Link to="/course">코스</Link></li>
                <li><Link to="/Notice">공지사항</Link></li>
            </ul>
            
            <div className="search">
  <input type="text" placeholder="검색어 입력"/>
  <FiSearch size="30" className="search_button" /> 
  </div></div>
                {isLogined ?
                    <ul>
                        <li><Link to="/mypage/mypageinfo">마이페이지</Link></li>
                        <div onClick={onClickLogOut}>
                        <li>로그아웃</li>
                        </div>
                    </ul>
                    :
                    <ul>
                        <Link to="/signIn">
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