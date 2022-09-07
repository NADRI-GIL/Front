import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoginedAtom, loginIdAtom } from './atom';

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
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <div>
                    <h1>나드리길</h1>
                </div>
                <div>
                    <h2>검색바</h2>
                </div>
                <div>
                    <h2>장바구니</h2>
                </div>
                {isLogined ?
                    <div>
                        <h2>마이페이지</h2>
                        <div onClick={onClickLogOut}>
                        <h2>로그아웃</h2>
                        </div>
                    </div>
                    :
                    <div>
                        <Link to="/signIn">
                        <h2>로그인</h2>
                        </Link>
                    </div>}
            </div>
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <h2>지역</h2>
                <h2>카테고리</h2>
                <h2>인기</h2>
                <h2>코스</h2>
                <h2>공지사항</h2>
            </div>
            <Outlet />
        </div>
    );
};

export default Header;