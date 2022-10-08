import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./routes/Main";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import PreferenceSurvey from "./routes/PreferenceSurvey";
import TravelList from "./routes/TravelList";
import CreateCourse from "./routes/CreateCourse";

import MyPageLayout from "./routes/MyPage/MyPageLayout"
import MyPageInfo from "./routes/MyPage/MyPageInfo";
import MyPageHeartList from "./routes/MyPage/MyPageHeartList";
import MyPageCourse from "./routes/MyPage/MyPageCourse";
function Router(){
    return (
    <BrowserRouter>
        <Routes>
            <Route element={<Header />}>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/signIn" element={<SignIn/>}></Route>
                <Route path="/signUp" element={<SignUp/>}></Route>
                <Route path="/preferenceSurvey" element={<PreferenceSurvey/>}></Route>
                <Route path="/travelList" element={<TravelList/>}></Route>
                <Route path="/createcourse" element={<CreateCourse/>}></Route>
                <Route path="/mypage" element={<MyPageLayout/>}>
                    <Route path="/mypage/mypageinfo" element={<MyPageInfo/>}></Route>
                    <Route path="/mypage/mypageheartlist" element={<MyPageHeartList/>}></Route>
                    <Route path="/mypage/mypagecourse" element={<MyPageCourse/>}></Route>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
    )
}
export default Router;