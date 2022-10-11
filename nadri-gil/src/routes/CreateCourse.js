import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useQuery } from "react-query";
import { directions5api } from "../api.js"
import "../index.css"

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
            lat: 36.62576080594968,
            add:"충북 청주시 흥덕구 풍산로 6"
        },
        {
            name: "충북대학교",
            lng: 127.45739630160224,
            lat: 36.6284055465184,
            add:"충북 청주시 서원구 충대로 1 충북대학교"
        },
        {
            name: "투썸플레이스 동남지구점",
            lng: 127.5170063098491,
            lat: 36.61543334257298,
            add:"충북 청주시 서원구 충대로 1 충북대학교"
        },
        {
            name: "청주고등학교",
            lng: 127.45537018595921,
            lat: 36.63558179683339,
            add:"충북 청주시 서원구 충대로 1 충북대학교"
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
        console.log(courseData)
        if (courseData != null) {
            const { naver } = window;

            let mapOptions = {
                center: new naver.maps.LatLng(courseData.trafast[0].summary.bbox[1][1] - (courseData.trafast[0].summary.bbox[1][1] - courseData.trafast[0].summary.bbox[0][1]) / 2, courseData.trafast[0].summary.bbox[1][0] - (courseData.trafast[0].summary.bbox[1][0] - courseData.trafast[0].summary.bbox[0][0]) / 2),
                zoom: 13
            };
            const style = "width:10vw;  background-color:white; padding:1vw;"

            let map = new naver.maps.Map('map', mapOptions);
            let markers = []
            let infowindows = []
            points.forEach((item, i) => {
                console.log(i)
                let marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(item.lat, item.lng),
                    map,
                });

                var content = `<div style='${style}'>
                <p style="font-family: 'SUIT';">
                ${item.name}
                </p>
                <p style="font-family: 'SUIT'; font-size:0.5vw;">
                ${item.add}
                <p>
                </div>`

                // 마커를 클릭시 나타내는 윈도우창
                let infowindow = new naver.maps.InfoWindow({
                    content: content,
                    backgroundColor: '#00ff0000',
                    borderColor: '#00ff0000',
                    anchorSize: new naver.maps.Size(0, 0)
                })

                markers.push(marker);
                infowindows.push(infowindow);
            })
            // 마커를 클릭시 infowindow을 창을 띄우는 이벤트와 닫는 이벤트들
            for (let i = 0, ii = markers.length; i < ii; i++) {
                naver.maps.Event.addListener(map, "click", ClickMap(i));
                naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
            }

            // 마커 이외의 영역 클릭시 닫기
            function ClickMap(i) {
                return function () {
                    var infowindow = infowindows[i];
                    infowindow.close()
                }
            }

            // 마커가 열려있을시 닫고 닫혔있을시 열리는 이벤트
            function getClickHandler(i) {
                return function () {
                    var marker = markers[i]
                    var infowindow = infowindows[i]
                    if (infowindow.getMap()) {// getMap -> infowindow가 표시 유무에 따라 true/false
                        infowindow.close()
                    } else {
                        infowindow.open(map, marker);
                        // map.setZoom(14, false);
                        // map.panTo(marker.position)
                    }
                }
            }

            let polylinePath = []

            for (let i = 0; i < courseData.trafast[0].path.length; i++) {
                polylinePath.push(new naver.maps.LatLng(courseData.trafast[0].path[i][1], courseData.trafast[0].path[i][0]))

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
            {isLoading ? 'loading...' : "<div>{data}</div>"}
            <MapContainer id="map"></MapContainer>
        </Container>
    )
};

export default CreateCourse;