import React, { useState, useEffect, useRef } from 'react';


function Course() {

  const data1 =[
        {course_id: 1, travel_id : 26343, name : '청계천' },
        {course_id: 1,travel_id : 27144, name :'광화문'},
        {course_id: 1,travel_id : 26801, name : '광장시장' },
        {course_id: 1,travel_id : 27159, name : '남산 케이블카' },
        {course_id: 1,travel_id : 26195, name : '동대문 종합시장·동대문 쇼핑타운' },
    ]

    const courselist = [
        {course_id : 1},
        {course_id : 2}
    ]

    return(
        <div>
            <h3>코스</h3>
            <h5>지자체 추천 코스</h5>

            <div>
           
            </div>
        </div>
    )
}

export default Course;