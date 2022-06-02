import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Main from './Body/Main';
import Footer from './Footer/Footer';
import Detail from './Body/Detail';
import Notice from './Body/Notice';
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
			</Routes>
	      <Footer/>
      </BrowserRouter>
		</div>
	);
}

export default App;
