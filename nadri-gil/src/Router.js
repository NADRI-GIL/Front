import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./routes/Main";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import PreferenceSurvey from "./routes/PreferenceSurvey";
import TravelDetail from "./routes/TravelDetail";
import PutData from "./routes/PutData";
import Notice from "./routes/Notice/Notice";
import TravelList from "./routes/TravelList";
import TravelListHeart from "./routes/TravelList-heart";
import CreateCourse from "./routes/CreateCourse";
import Course from "./routes/Course";

import MyPageLayout from "./routes/MyPage/MyPageLayout"
import MyPageInfo from "./routes/MyPage/MyPageInfo";
import MyPageHeartList from "./routes/MyPage/MyPageHeartList";
import MyPageCourse from "./routes/MyPage/MyPageCourse";
import MyPageCourseList from "./routes/MyPage/MyPageCourseList";
import MypageViewCourse from "./routes/MyPage/MypageViewCourse";

import NoticeContent from "./routes/Notice/NoticeContent";
import NoticeWrite from "./routes/Notice/NoticeWrite";
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Header />}>
                    <Route path="/" element={<Main/>}></Route>
                    <Route path="/signIn" element={<SignIn />}></Route>
                    <Route path="/signUp" element={<SignUp />}></Route>
                    <Route path="/preferenceSurvey" element={<PreferenceSurvey />}></Route>
                    <Route path="/TravelDetail/:id" element={<TravelDetail/>}></Route>
                    <Route path="/PutData" element={<PutData/>}></Route>
                    <Route path="/Notice" element={<Notice/>}></Route>
                    <Route path="/travelList" element={<TravelList/>}></Route>
                    <Route path="/travelListHeart" element={<TravelListHeart/>}></Route>

                <Route path="/createcourse" element={<CreateCourse/>}></Route>
                <Route path="/course" element={<Course/>}></Route>
                <Route path="viewcourse/:courseId" element={<MypageViewCourse/>}></Route>
            
                <Route path="/mypage" element={<MyPageLayout/>}>
                    <Route path="/mypage/mypageinfo" element={<MyPageInfo/>}></Route>
                    <Route path="/mypage/mypageheartlist" element={<MyPageHeartList/>}></Route>
                    <Route path="/mypage/mypagecourse" element={<MyPageCourse/>}></Route>
                    <Route path="/mypage/mypagecourselist" element={<MyPageCourseList/>}></Route>
                    
                    </Route>
                <Route path="/notice/noticecontent" element={<NoticeContent/>}></Route>
                <Route path="/notice/noticewrite" element={<NoticeWrite/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Router;