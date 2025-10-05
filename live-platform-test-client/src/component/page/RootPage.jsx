import { Link } from "react-router-dom";

const RootPage = () => {
    return (
        <>
            <h1>MainPage</h1>
            <p> 이 어플리케이션은 다음과 같은 기능이 있습니다.</p>
            <p>우선 로그인으로 더 많은 기능을 이용하세요.</p>
            <ul>
                <li>인증</li>
                <ul>
                    <li>로그인</li>
                    <li>회원가입</li>
                    <li>로그아웃</li>
                </ul>
                <li>방송 하기</li>
                <li>방송 보기</li>
                <li>방송 탐색하기</li>
                <li>방송채널 만들기 ❌</li>
                <li>방송채널 검색하기</li>
                <li>채팅</li>
            </ul>
        </>
    );
};

export default RootPage;
