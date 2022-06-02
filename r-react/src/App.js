import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Main from './Body/Main';
import Footer from './Footer/Footer';
import Detail from './Body/Detail';
import Notice from './Body/Notice';
import Region from './Body/Region';
import Login from './Body/Login';
import SignUp from './Body/SignUp';

const App = () => {
	return (
		<div className='App'>
      <BrowserRouter>
			<Header/>
			<Routes>
				{/* main / 상세 페이지/ 공지사항 */}
				<Route path="/" element={<Main />}></Route>			
				<Route path="/Detail" element={<Detail />}></Route>
				<Route path="/Notice" element={<Notice />}></Route>
				<Route path="/Region" element={<Region />}></Route>
				<Route path="/SignUp" element={<SignUp />}></Route>
				<Route path="/Login" element={<Login />}></Route>


			</Routes>
	      <Footer/>
      </BrowserRouter>
		</div>
	);
}

export default App;
