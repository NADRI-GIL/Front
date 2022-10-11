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
height:60vh;
`
const Content = styled.div`
width:90%;
// height:25vh;
padding:5px;
text-align:center;
    img{
        width:100%;
    }
    a{
        text-decoration: none;
        color:black;
    }
    p{
        font-family: 'SUIT';
        font-size:0.8vw;
        margin-top:1vh;
    }
`;
const CourseContent = styled.div`
width:20%;
// height:25vh;
display:flex;
justify-content:center;
text-align:center;
    img{
        width:100%;
    }
    a{
        text-decoration: none;
        color:black;
    }

`;
const TotalDistance = styled.h4`
font-family: 'SUIT';
`
const Distance = styled.div`
width:30%;
font-family: 'SUIT';
        font-size:0.6vw;
        margin:auto;
`
const ContentList = styled.div`
display:flex;
flex-wrap:wrap;
width:100%;
margin:auto;
margin-top:3vh;


`
const Menu = styled.div`
    width:100%;
    height:5vh;
    display: flex;
    margin-bottom:3vh;
`;
const Menus = styled.div`
    width:15%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    p{
        margin:auto;
        font-family: 'SUIT';
    }
`;
const Hr = styled.hr`
border:0;
height:2px;
margin:1vh 0 1vh 0;
background-color:#f4f4f4;
`
function CreateCourse() {
    const points = [
        {
            name: "청주 시외버스터미널",
            lng: 127.43202481650647,
            lat: 36.62576080594968,
            add:"충북 청주시 흥덕구 풍산로 6",
            "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
        },
        {
            name: "충북대학교",
            lng: 127.45739630160224,
            lat: 36.6284055465184,
            add:"충북 청주시 서원구 충대로 1 충북대학교",
            "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
        },
        {
            name: "투썸플레이스 동남지구점",
            lng: 127.5170063098491,
            lat: 36.61543334257298,
            add:"충북 청주시 서원구 충대로 1 충북대학교",
            "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
        },
        {
            name: "청주고등학교",
            lng: 127.45537018595921,
            lat: 36.63558179683339,
            add:"충북 청주시 서원구 충대로 1 충북대학교",
            "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
        },
        {
            name: "청주고등학교",
            lng: 127.65537018595921,
            lat: 36.63558179683339,
            add:"충북 청주시 서원구 충대로 1 충북대학교",
            "image": "https://user-images.githubusercontent.com/58421346/194452297-e7a076d3-5475-4cde-bd95-cbfa8342c8f6.png"
        }
    ]
    const [courseData, setCourseData] = useState(null)
    const [courseOption, setCourseOption] = useState(0)
    //0:trafast, 1:tracomfort, 2:traoptimal
    const [targetData, setTargetData] = useState(null)
    // const [trafastInfo, setTrafastInfo] = useState([])
    // const [traoptimalInfo, setTraoptimalInfo] = useState([])
    const [courseInfo, setCourseInfo] = useState([])


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
            setTargetData(courseData.trafast[0])
            const { naver } = window;

            let mapOptions = {
                center: new naver.maps.LatLng(courseData.trafast[0].summary.bbox[1][1] - (courseData.trafast[0].summary.bbox[1][1] - courseData.trafast[0].summary.bbox[0][1]) / 2, courseData.trafast[0].summary.bbox[1][0] - (courseData.trafast[0].summary.bbox[1][0] - courseData.trafast[0].summary.bbox[0][0]) / 2),
                zoom: 12
            };
            const style = "background-color:white; padding:1vw; border-radius:0.5vw;"

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
                <span style="font-family: 'SUIT'; font-size:0.6vw; display:inline-block;margin-bottom:0;">
                ${item.add}
                <span>
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
            var polyline = new naver.maps.Polyline({
                path: polylinePath,     //선 위치 변수배열
                strokeColor: '#3366ff', //선 색 빨강 #빨강,초록,파랑
                strokeOpacity: 0.8, //선 투명도 0 ~ 1
                strokeWeight: 6,   //선 두께
                map: map           //오버레이할 지도
            });
            let info = []
            courseData.trafast[0].summary.waypoints.forEach((item)=>{
                info.push({distance:item.distance,
                duration:item.duration})
            })
            info.push({distance:courseData.trafast[0].summary.goal.distance, duration:courseData.trafast[0].summary.goal.duration})
            setCourseInfo([...info])
        }

    }, [courseData])
    const optionhaddle = (index) => {
        let target = null
        if(index===0) target=courseData.trafast[0];
        else if(index===1) target=courseData.tracomfort[0]
        else if(index===2) target=courseData.traoptimal[0]
        setTargetData(target)
        console.log(target,index)
        if (target != null) {
            const { naver } = window;

            let mapOptions = {
                center: new naver.maps.LatLng(target.summary.bbox[1][1] - (target.summary.bbox[1][1] - target.summary.bbox[0][1]) / 2, target.summary.bbox[1][0] - (target.summary.bbox[1][0] - target.summary.bbox[0][0]) / 2),
                zoom: 12
            };
            const style = "background-color:white; padding:1vw; border-radius:0.5vw;"

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
                <span style="font-family: 'SUIT'; font-size:0.6vw; display:inline-block;margin-bottom:0;">
                ${item.add}
                <span>
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

            for (let i = 0; i < target.path.length; i++) {
                polylinePath.push(new naver.maps.LatLng(target.path[i][1], target.path[i][0]))

            }
            new naver.maps.Polyline({
                path: polylinePath,     //선 위치 변수배열
                strokeColor: '#3366ff', //선 색 빨강 #빨강,초록,파랑
                strokeOpacity: 0.8, //선 투명도 0 ~ 1
                strokeWeight: 6,   //선 두께
                map: map           //오버레이할 지도
            });
            let info = []
            target.summary.waypoints.forEach((item)=>{
                info.push({distance:item.distance,
                duration:item.duration})
            })
            info.push({distance:target.summary.goal.distance, duration:target.summary.goal.duration})
            setCourseInfo([...info])
        }

    }

    return (
        <Container>
            <Menu>
            {courseOption === 0? <Menus onClick={() => {setCourseOption(0)}}><p style={{borderBottom:"0.5vh solid #3366ff", paddingBottom:"1vh"}}>실시간 빠른길</p></Menus>:<Menus onClick={() => {setCourseOption(0); optionhaddle(0)}}><p style={{borderBottom:"0.5vh solid white", paddingBottom:"1vh"}}>실시간 빠른길</p></Menus>}
            {courseOption === 1? <Menus onClick={() =>{setCourseOption(1)}}><p style={{borderBottom:"0.5vh solid #3366ff", paddingBottom:"1vh"}}>실시간 편한길</p></Menus>:<Menus onClick={() =>{setCourseOption(1); optionhaddle(1)}}><p style={{borderBottom:"0.5vh solid white", paddingBottom:"1vh"}}>실시간 편한길</p></Menus>}
            {courseOption === 2? <Menus onClick={() => {setCourseOption(2)}}><p style={{borderBottom:"0.5vh solid #3366ff", paddingBottom:"1vh"}}>실시간 최적</p></Menus>:<Menus onClick={() =>{setCourseOption(2); optionhaddle(2)}}><p style={{borderBottom:"0.5vh solid white", paddingBottom:"1vh"}}>실시간 최적</p></Menus>}
            </Menu>
            <TotalDistance>
                {targetData!=null?targetData.summary.duration>3600000?'총 '+(targetData.summary.distance/1000).toFixed(2)+'km':'총'+(targetData.summary.distance).toFixed(2)+"m":''}
            {targetData!=null?targetData.summary.duration>3600000?', '+(targetData.summary.duration/3600000).toFixed(2)+'시간 소요':', '+(targetData.summary.duration/60000).toFixed(2)+"분 소요":''}
            </TotalDistance>
            <Hr/>
            <ContentList>
            {points.map((item, i) => {
                    return (
                        <CourseContent>
                            <Distance>{courseInfo[i-1]!=undefined?courseInfo[i-1].distance>1000?'-'+(courseInfo[i-1].distance/1000).toFixed(2)+'km'+'→':'-'+(courseInfo[i-1].distance).toFixed(2)+"m→":''}<br>
                        </br>
                        {courseInfo[i-1]!=undefined?courseInfo[i-1].duration>3600000?'-'+(courseInfo[i-1].duration/3600000).toFixed(0)+'시간'+'→':'-'+(courseInfo[i-1].duration/60000).toFixed(0)+"분→":''}</Distance>
                        <Content>
                                <img src={item.image}></img>
                                <p>{item.name}</p>    
                        </Content>
                        </CourseContent>
                    )
                })}
            </ContentList>
            <MapContainer id="map"></MapContainer>
        </Container>
    )
};

export default CreateCourse;