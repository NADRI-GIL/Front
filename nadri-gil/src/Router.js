import {BrowserRouter,Routes,Route} from "react-router-dom";
import Main from "./routes/Main";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";


function Router(){
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main/>}></Route>
            <Route path="/signIn" element={<SignIn/>}></Route>
            <Route path="/signUp" element={<SignUp/>}></Route>
        </Routes>
    </BrowserRouter>
    )
}
export default Router;