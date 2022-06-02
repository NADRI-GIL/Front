import { render } from '@testing-library/react';
import React , { useState } from 'react';
import './Notice.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import Pagination from "react-js-pagination";
// import './Paging.css';

const Paging = () => {
    const [page, setPage] = useState(1);
  
    const handlePageChange = (page) => {
      setPage(page);
    };
  
    return (
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={10}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    );
  };
  
  

class Notice1 extends React.Component{
    render(){
        return (
            <div className ="N_list" >
                <div className="N_name" >
                    <h1>공지사항</h1>
                    <div class="N_search">
                    <input className ="" type="text" placeholder="검색어를 입력하세요" />
                        <button className="N_search_I"><AiOutlineSearch size="30"/></button>
                    </div>
                </div>
                <ul>
                    <li><a href="#">sdaf</a></li><hr/>
                    <li><a>adf</a></li><hr/>
                    <li><a>asdfsf</a></li><hr/>
                    <li><a>wqeq</a></li><hr/>
                    <li><a href="#">sdaf</a></li><hr/>
                    <li><a>adf</a></li><hr/>
                    <li><a>asdfsf</a></li><hr/>
                    <li><a>wqeq</a></li><hr/>
                </ul>
            </div>
        )
    }
}


class Notice extends React.Component{
    render(){
        return (
            <div className ="app_notice">
                <Notice1/>
                <Paging/>
            </div>
        );
    }
}

export default Notice;