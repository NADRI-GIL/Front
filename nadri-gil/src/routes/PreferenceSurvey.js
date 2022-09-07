import React, { useState } from 'react'
import { useQuery } from "react-query";
import { getPreference } from "../api.js"

function PreferencesSurvey() {
    const [preferenceTouristDestination, setPreferenceTouristDestination] = useState(new Array(20).fill(false))
    const { isLoading, isError, error, data } = useQuery('preference', getPreference);
    
    // const data = [
    //     { id: 0, name: '경복궁', image: './img/images.jpg' },
    //     { id: 1, name: '경복궁1', image: './img/images.jpg' },
    //     { id: 2, name: '경복궁2', image: './img/images.jpg' },
    //     { id: 3, name: '경복궁3', image: './img/images.jpg' },
    //     { id: 4, name: '경복궁4', image: './img/images.jpg' },
    //     { id: 5, name: '경복궁5', image: './img/images.jpg' },
    //     { id: 6, name: '경복궁6', image: './img/images.jpg' },
    // ]

    const onpreferenceTouristDestinationHandler = (index) => {
        let tmp = [...preferenceTouristDestination]
        tmp[index] = !tmp[index]
        setPreferenceTouristDestination(tmp)
        console.log(preferenceTouristDestination)
    }
    const onClickHandler = () => {
        let preference = []
        for (let i = 0; i < preferenceTouristDestination.length; i++) {
            if (preferenceTouristDestination[i]) preference.push(i)
        }
        console.log(preference)
    }

    return (
        <div>
            <h1>여행지 선호도 조사 페이지</h1>
            <div style={{display:"flex",flexWrap:"wrap",textAlign:"center",paddingRight:"4vw"}}>
            {data.list.map((e, i) => {
                if (preferenceTouristDestination[i]) {
                    return (
                        <div style={{display:'flex', flexDirection:'column', width:'20%',paddingRight:"4vw"}}>
                            <img src={e.image} style={{filter:'brightness(0.5)'}} onClick={() => onpreferenceTouristDestinationHandler(i)}></img>
                            <label onClick={() => onpreferenceTouristDestinationHandler(i)}>{e.name}</label>
                        </div>
                    )
                }
                else{
                    return (
                        <div style={{display:'flex', flexDirection:'column', width:'20%',paddingRight:"4vw"}}>
                            <img src={e.image} onClick={() => onpreferenceTouristDestinationHandler(i)}></img>
                            <label onClick={() => onpreferenceTouristDestinationHandler(i)}>{e.name}</label>
                        </div>
                    )
                }

            })}
            </div>
            <button onClick={onClickHandler}>완료</button>
        </div>
    )
}
export default PreferencesSurvey;