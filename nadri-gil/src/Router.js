import {BrowserRouter,Routes,Route} from "react-router-dom";
import Main from "./routes/Main";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import PreferenceSurvey from "./routes/PreferenceSurvey";
import TravelDetail from "./routes/TravelDetail";
import PutData from "./routes/PutData";
function Router(){
    return (
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Main/>}></Route> */}
            <Route path="/signIn" element={<SignIn/>}></Route>
            <Route path="/signUp" element={<SignUp/>}></Route>
            <Route path="/preferenceSurvey" element={<PreferenceSurvey/>}></Route>
            <Route path="/Main" element={<Main/>}></Route>
            <Route path="/TravelDetail" element={<TravelDetail/>}></Route>
            <Route path="/PutData" element={<PutData/>}></Route>
        </Routes>
    </BrowserRouter>
    )
}
export default Router;