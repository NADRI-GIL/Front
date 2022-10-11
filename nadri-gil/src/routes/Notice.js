import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';


function Notice(){
    const data=[
        {notice_id:1, user_id: 1,register_date:20220208 , content :"내용" , tag: "중요"  },
        {notice_id:2, user_id: 1,register_date:20220208 , content :"내용" , tag: "중요"  },
        {notice_id:3, user_id: 1,register_date:20220208 , content :"내용" , tag: "중요"  },
        {notice_id:4, user_id: 1,register_date:20220208 , content :"내용" , tag: "중요"  },
        {notice_id:5, user_id: 1,register_date:20220208 , content :"내용" , tag: "중요"  },
    ]

    return(
     <div className="main">
          {data.map((e)=> {
          return( 
            <ul>
      <li>
       <Link to ="../Notice" state={e}>{e.content} 작성자 :{e.user_id} 등록일 : {e.register_date}</Link>
      </li>
      <hr style={{width:"300px"}}/>
      </ul>
        )
      })}
 </div>
    )

}

export default Notice;
