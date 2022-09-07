import React, { useState } from 'react'
import { useMutation } from "react-query";


function NewData(){

  const postNew = async (data) => {
    return fetch(`http://43.200.49.4:8080/travels/new`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json());
  }


    const { mutate, isLoading } = useMutation(postNew, {
        onSuccess: data => {
          console.log(data);
          if(data.resultCode === 0){
            alert(data.resultMsg)
          }
          else{
            alert(data.resultMsg)
          }
        },
        onError: () => {
        //   alert("there was an error")
        },

      });

    const onClickPutdata = () =>{
        mutate({
            
            "image": "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=b62a331e-2806-4d2d-95ea-1c2814beba30",
            "name":"우암사",
            "location": "대전 동구" ,
            "address": "대전광역시 동구 충정로 53",
            "likeCount": 0,
            "info" : "우암사적공원은 조선 후기 대유학자인 우암 송시열(1607~1689) 선생이 학문을 닦던 곳으로 1991년부터 1997년까지 1만 6천여 평에 장판각, 유물관, 서원 등의 건물을 재현해 1998년 4월 17일 사적공원으로 새롭게 탄생했다. 이곳은 선생이 말년에 제자를 가르치고 학문에 정진하던 남간정사, 건축미가 뛰어난 기국정, 송시열 문집인 송자대전판 등 역사적으로 중요한 문화재가 보전되어 있을 뿐만 아니라 공원 곳곳이 잘 단장되어 있어 도심 속 시민들의 쉼터로도 제격이다. 사적공원 안으로 들어서면 맨 먼저 왼쪽으로 대전시 유형문화재로 지정되어 있는 남간정사와 기국정 건물이 자리하고 있다. 남간정사를 살펴보고 나와 좀 더 위쪽으로 올라가면 우암선생의 유물과 일생을 살펴볼 수 있는 유물관이 있고, 유물관 앞 홍살문 사이로 멀리 명정문(明正門)이 보인다. 조선시대 서원의 형태를 재현해 놓은 곳이다.서원 안으로 들어서면 우측에는 모든 괴로움을 참아야 한다는 뜻의 인함각(忍含閣), 좌측에는 모든 일을 명확하게 하고 마음을 맑게 하라는 뜻을 담은 명숙각(明淑閣), 정면에는 마음을 곧게 쓰라는 뜻의 강당인 이직당(以直堂)이 자리를 하고 있다. 그 뒤로 매사 심사숙고하여 결정하라는 뜻의 심결재(審決齋)와 선현의 가르침을 굳게 지키라는 견뢰재(堅牢齋)가 있으며, 가장 높은 곳에 새로 옮겨 지은 남간사가 자리잡고 있다. 다시 명정문을 나와 우측으로 돌아가면 연못과 덕포루(德布樓)가 한 폭의 그림같이 펼쳐진다. 덕포루와 더불어 고즈넉한 연못이 운치를 한층 더한다. 감탄사가 절로 나오는 근사한 풍광에 다시 한번 마음의 경계가 풀린다. 한편 사적공원 내에는 봄, 가을 우암 선생의 제향 봉행이 이루어지고 있다. 조선 후기 이 땅에 유교사상을 꽃피운 우암 송시열 선생의 뜻을 기리고 보존하기 위해 조성된 우암사적공원. 대학자 우암의 숨결을 느낄 수 있을 것이다.",
            "latitude":36.34793488652079 ,
            "longitude":127.4581788566933  ,
            "category": "관광지"
        })
    }
    return(
        <div>
          <h1>dfsdafads</h1>
<button onClick={onClickPutdata}>click</button>
<h1>dfsdafads</h1>
        </div>
    )
}
export default  NewData;