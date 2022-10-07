import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useMutation, useQuery } from "react-query";
import { directions5api } from "../api.js"

function Main() {

    let navigate = useNavigate();
    // const {isLoading1, data} = useQuery("z", directions5api, {

    //     onSuccess: data => {
    //       // 성공시 호출
    //       console.log(data);
    //     },
    //     onError: e => {
    //       // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
    //       // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
    //       console.log(e.message);
    //     }
    //   });

    
    return (
        <></>
    )
}
export default Main;