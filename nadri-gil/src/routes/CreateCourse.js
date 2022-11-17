import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";
import { directions5api, postCourse } from "../api.js"
import { useLocation,useNavigate } from 'react-router-dom';
import "../index.css"


const Container = styled.div`
    width:55%;
    margin:auto;

`;
const MapContainer = styled.div`
width:90%;
height:50vh;
margin-top:3vh;
margin:auto;
`
const Content = styled.div`
width:90%;
// height:25vh;
padding:5px;
text-align:center;
    img{
        width:100%;
        object-fit: cover;
        height:12vh;
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
const CompleteButton = styled.button`
float:right;
font-family: 'SUIT';
box-sizing: border-box;
background-color:#3366ff;
color:#ffffff;
border:none;
border-radius: 10px;
height: 6vh;
font-size:0.8vw;
padding:0 7vh 0 7vh;
margin: 8vh auto 8vh auto;
// margin-top:2vh;
`

const Popupdiv = styled.div`
font-family: 'SUIT';
backdrop-filter: blur;
background-color: white;
border:2px solid rgb(245 244 244);
box-shadow: 0 5px 18px -7px rgba(0,0,0,1);
z-index: 10;
top: 20%;
left: 25%;
position: fixed;
height: 60vh;
width: 50vw;
border-radius : 20px;
// text-align: center;
align-item: center;
h4{
    text-align: center;
    margin-top:5vh;
}
h5{
    font-family: 'SUIT';
    height: 35%;
    align-items: center;
    justify-content: center;
}
input{
    background-color :rgb(240, 237, 237);
    border-radius: 10px;
    border: none;
    width: 90%;
    height: 15%;
    padding-left:1vw;
    margin-left:5%;
}
textarea{
    background-color :rgb(240, 237, 237);
    border-radius: 10px;
    border: none;
    width: 90%;
    height: 15%;
    padding-left:1vw;
    margin-left:5%;
}
button{
    font-family: 'SUIT';
    box-sizing: border-box;
    background-color:#3366ff;
    color:#ffffff;
    border:none;
    border-radius: 10px;
    height: 6vh;
    padding:0 5vh 0 5vh;
    margin:3vh 1vw 0 1vw;
}
p{
    margin:3vh 0 2vh 0vw;
    margin-left:5%;
}
`

function CreateCourse(props) {
    const location = useLocation();
    const state = location.state;

    console.log(state);

    const [courseData, setCourseData] = useState(null)
    const [courseOption, setCourseOption] = useState(0)
    //0:trafast, 1:tracomfort, 2:traoptimal
    const [targetData, setTargetData] = useState(null)
    // const [trafastInfo, setTrafastInfo] = useState([])
    // const [traoptimalInfo, setTraoptimalInfo] = useState([])
    const [courseInfo, setCourseInfo] = useState([])
    
    const { isLoading, data } = useQuery(["createCourse", state], () => directions5api(state), {
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
                zoom: 8
            };
            const style = "background-color:white; padding:1vw; border-radius:0.5vw;"

            let map = new naver.maps.Map('map', mapOptions);
            let markers = []
            let infowindows = []
            state.forEach((item, i) => {
                console.log(i)
                let marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(item.latitude, item.longitude),
                    map,
                });

                var content = `<div style='${style}'>
                <p style="font-family: 'SUIT';">
                ${item.name}
                </p>
                <span style="font-family: 'SUIT'; font-size:0.6vw; display:inline-block;margin-bottom:0;">
                ${item.address}
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
            courseData.trafast[0].summary.waypoints?.forEach((item) => {
                info.push({
                    distance: item.distance,
                    duration: item.duration
                })
            })
            info.push({ distance: courseData.trafast[0].summary.goal.distance, duration: courseData.trafast[0].summary.goal.duration })
            setCourseInfo([...info])
        }

    }, [courseData])
    const optionhaddle = (index) => {
        let target = null
        if (index === 0) target = courseData.trafast[0];
        else if (index === 1) target = courseData.tracomfort[0]
        else if (index === 2) target = courseData.traoptimal[0]
        setTargetData(target)
        console.log(target, index)
        if (target != null) {
            const { naver } = window;

            let mapOptions = {
                center: new naver.maps.LatLng(target.summary.bbox[1][1] - (target.summary.bbox[1][1] - target.summary.bbox[0][1]) / 2, target.summary.bbox[1][0] - (target.summary.bbox[1][0] - target.summary.bbox[0][0]) / 2),
                zoom: 8
            };
            const style = "background-color:white; padding:1vw; border-radius:0.5vw;"

            let map = new naver.maps.Map('map', mapOptions);
            let markers = []
            let infowindows = []
            state.forEach((item, i) => {
                console.log(i)
                let marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(item.latitude, item.longitude),
                    map,
                });

                var content = `<div style='${style}'>
                <p style="font-family: 'SUIT';">
                ${item.name}
                </p>
                <span style="font-family: 'SUIT'; font-size:0.6vw; display:inline-block;margin-bottom:0;">
                ${item.address}
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
            target.summary.waypoints?.forEach((item) => {
                info.push({
                    distance: item.distance,
                    duration: item.duration
                })
            })
            info.push({ distance: target.summary.goal.distance, duration: target.summary.goal.duration })
            setCourseInfo([...info])
        }

    }

    const loginid = JSON.parse(localStorage.getItem("recoil-persist"));



    const [popup, handlePopup] = useState(false);

    const Popup = () => {

        const [name, setName] = useState("")
        const [content, setContent] = useState("")
        let navigate = useNavigate();
        const onNameHandler = (event) => {
            setName(event.currentTarget.value)
        }
        const onContentHandler = (event) => {
            setContent(event.currentTarget.value)
        }
        const { mutate } = useMutation(postCourse, {
            onSuccess: data => {
                // console.log(data);
                if (data.resultCode === 0) {
                    alert(data.resultMsg)
                    navigate('/mypage/mypageinfo')
                }
                else {
                    alert(data.resultMsg)
                }
            },
            onError: () => {
                console.log("error");
            },

        });

        const onClickshare = () => {
            let tmp = []
            console.log(content)
            state.forEach((item, index) => {
                tmp.push(
                    { travelId: item.travelId, orderNo: index + 1 });
            })
            mutate({
                "loginId": loginid.loginId,
                "name": name,
                "content":content,
                "courseOrders": tmp

            })
        }

        return (
            <Popupdiv>
                    <h4>코스만들기</h4>
                    <p>제목을 입력하세요</p>
                    <input type="text" onChange={onNameHandler} value={name} style={{height:'10%'}}></input>
                    <p>내용을 입력하세요</p>
                    <textarea  onChange={onContentHandler} value={content}  style={{height:'30%'}}></textarea>
                    <div style={{ width:'100%', textAlign:'center'}}>
                    <button onClick={() => {handlePopup(false)}} >취소</button>
                    <button onClick={() => {onClickshare()}}>제출</button>
                    </div>
            </Popupdiv>
        )
    }

    return (
        <Container>
            <Menu>

                {courseOption === 0 ? <Menus onClick={() => { setCourseOption(0) }}><p style={{ borderBottom: "0.5vh solid #3366ff", paddingBottom: "1vh" }}>실시간 빠른길</p></Menus> : <Menus onClick={() => { setCourseOption(0); optionhaddle(0) }}><p style={{ borderBottom: "0.5vh solid white", paddingBottom: "1vh" }}>실시간 빠른길</p></Menus>}
                {courseOption === 1 ? <Menus onClick={() => { setCourseOption(1) }}><p style={{ borderBottom: "0.5vh solid #3366ff", paddingBottom: "1vh" }}>실시간 편한길</p></Menus> : <Menus onClick={() => { setCourseOption(1); optionhaddle(1) }}><p style={{ borderBottom: "0.5vh solid white", paddingBottom: "1vh" }}>실시간 편한길</p></Menus>}
                {courseOption === 2 ? <Menus onClick={() => { setCourseOption(2) }}><p style={{ borderBottom: "0.5vh solid #3366ff", paddingBottom: "1vh" }}>실시간 최적</p></Menus> : <Menus onClick={() => { setCourseOption(2); optionhaddle(2) }}><p style={{ borderBottom: "0.5vh solid white", paddingBottom: "1vh" }}>실시간 최적</p></Menus>}
            </Menu>

            <TotalDistance>
                {targetData != null ? targetData.summary.duration > 3600000 ? '총 ' + (targetData.summary.distance / 1000)?.toFixed(2) + 'km' : '총' + (targetData.summary.distance)?.toFixed(2) + "m" : ''}
                {targetData != null ? targetData.summary.duration > 3600000 ? ', ' + (parseInt(targetData.summary.duration / 3600000)) + '시간 ' + ((targetData.summary.duration % 3600000) / 60000)?.toFixed(0) + '분 소요' : ', ' + (targetData.summary.duration / 60000)?.toFixed(2) + "분 소요" : ''}
            </TotalDistance>
            <Hr />
            <ContentList>
                {state.map((item, i) => {
                    return (
                        <CourseContent>
                            <Distance>{courseInfo[i - 1] != undefined ? courseInfo[i - 1].distance > 1000 ? '-' + (courseInfo[i - 1].distance / 1000)?.toFixed(2) + 'km' + '→' : '-' + (courseInfo[i - 1].distance)?.toFixed(2) + "m→" : ''}<br>
                            </br>
                                {courseInfo[i - 1] != undefined ? courseInfo[i - 1].duration > 3600000 ? '-' + (courseInfo[i - 1].duration / 3600000)?.toFixed(0) + '시간' + '→' : '-' + (courseInfo[i - 1].duration / 60000)?.toFixed(0) + "분→" : ''}</Distance>
                            <Content>
                                <Link to={`/TravelDetail/${item.travelId}`} >

                                    <img src={item.image}></img>
                                    <p>{item.name}</p>
                                </Link>
                            </Content>
                        </CourseContent>
                    )
                })}
            </ContentList>
            <MapContainer id="map"></MapContainer>
            <CompleteButton onClick={() => { handlePopup(true); }}>내가 만든 코스 저장하기 -&gt;</CompleteButton>
            {popup && <Popup onClose={handlePopup} />}
        </Container>
    )
};

export default CreateCourse;