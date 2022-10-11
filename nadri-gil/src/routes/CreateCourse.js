import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useQuery } from "react-query";
import { directions5api } from "../api.js"

const Container = styled.div`
    width:60%;
    margin:auto;
`;
const MapContainer = styled.div`
width:100%;
height:80vh;
`

function CreateCourse() {
    const points = [
        {
            name: "청주 시외버스터미널",
            lng: 127.43202481650647,
            lat: 36.62576080594968
        },
        {
            name: "충북대학교",
            lng: 127.45739630160224,
            lat: 36.6284055465184
        },
        {
            name: "투썸플레이스 동남지구점",
            lng: 127.5170063098491,
            lat: 36.61543334257298
        },
        {
            name: "청주고등학교",
            lng: 127.45537018595921,
            lat: 36.63558179683339
        }
    ]
    const [courseData, setCourseData] = useState(null)

    const { isLoading, data } = useQuery("createCourse", () => directions5api(points), {
        cacheTime: Infinity,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        onSuccess: data => {
            // 성공시 호출
            setCourseData(data.route)
            console.log(data);
        },
        onError: e => {
            // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
            // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
            console.log(e.message);
        }
    });
    useEffect(() => {
        if (courseData != null) {
            const { naver } = window;

            let mapOptions = {
                center: new naver.maps.LatLng(courseData.trafast[0].summary.start.location[1], courseData.trafast[0].summary.start.location[0]),
                zoom: 15
            };

            let map = new naver.maps.Map('map', mapOptions);
            new naver.maps.Marker({
                position: new naver.maps.LatLng(courseData.trafast[0].summary.start.location[1], courseData.trafast[0].summary.start.location[0]),
                map,
            });
            new naver.maps.Marker({
                position: new naver.maps.LatLng(courseData.trafast[0].summary.goal.location[1], courseData.trafast[0].summary.goal.location[0]),
                map,
            });
            for (let i = 0; i < courseData.trafast[0].summary.waypoints.length; i++) {
                new naver.maps.Marker({
                    position: new naver.maps.LatLng(courseData.trafast[0].summary.waypoints[i].location[1], courseData.trafast[0].summary.waypoints[i].location[0]),
                    map,
                });
            }
            let polylinePath = []

            for (let i = 0; i < courseData.trafast[0].path.length; i++) {
                polylinePath.push(new naver.maps.LatLng(courseData.trafast[0].path[i][1],courseData.trafast[0].path[i][0] ))
                               
            }
            new naver.maps.Polyline({
                path: polylinePath,     //선 위치 변수배열
                strokeColor: '#3366ff', //선 색 빨강 #빨강,초록,파랑
                strokeOpacity: 0.8, //선 투명도 0 ~ 1
                strokeWeight: 6,   //선 두께
                map: map           //오버레이할 지도
            });

        }

    }, [courseData])

    return (
        <Container>
            {isLoading ? 'loading...' : 
            <div>{courseData.trafast[0].summary.duration/60000}분 소요됩니다.</div>}
            <MapContainer id="map"></MapContainer>
        </Container>
    )
};

export default CreateCourse;