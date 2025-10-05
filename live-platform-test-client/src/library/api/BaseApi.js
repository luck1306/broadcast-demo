import axios from "axios";
import cookie from "js-cookie";

const request = axios.create({
    baseURL: process.env.REACT_APP_HTTPSERVER,
    timeout: 1000 * 5,
    headers: {
        "Content-Type": "application/json",
        "Authorization": cookie.get("accessToken"),
    },
    withCredentials: true,
});

request.interceptors.request.use((config) => {
    // 요청을 보내기 전에 수행할 작업
    // 예: 토큰 갱신, 로딩 표시 등
    // console.log(config);
    return config;
}, (error) => {
    // 요청 오류가 있는 경우 수행할 작업
    return Promise.reject(error);
});

request.interceptors.response.use((response) => {
    // 응답 데이터를 가공
    return response;
}, (error) => {
    // 응답 오류가 있는 경우 수행할 작업
    if (error.response) {
        // 서버가 상태 코드로 응답한 경우
        console.error("Error Response:", error.response);
    } else if (error.request) {
        // 요청이 만들어졌지만 응답을 받지 못한 경우
        console.error("No Response:", error.request);
    } else {
        // 요청 설정 중에 오류가 발생한 경우
        console.error("Request Error:", error.message);
    }
    return Promise.reject(error);
});

export default request;