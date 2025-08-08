# WebRTC Broadcast platform

이 프로젝트는 WebRTC를 사용해 간이 방송 플랫폼을 구현함. 아래 게시글을 기반으로 개발되었음

<a href=" https://medium.com/@fengliu_367/getting-started-with-webrtc-a-practical-guide-with-example-code-b0f60efdd0a7">원 게시글</a>

### 주요 API

- <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia">getUserMedia</a> 접속한 장치의 별도의 입력장치를 가져온다. (e.g. microphone, camera)
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection">RTCPeerConnection</a> WebRTC에서 가장 주된 API로 종단 간 연결에 사용된다.

<span style="color: red;">※ 주의 사항 : getUserMedia() 함수는 "https" 환경에서만 유효합니다. 이 프로젝트에서는 mkcert를 통해 내부망에서 검증했지만 서비스로 응용하기 위해 별도로 인증서를 발급받아 추가해야합니다.</span>


### 프로젝트 시퀀스 다이어그램

### 팁
- RTCPeerConnection의 track 이벤트의 원활한 송수신을 위한 메서드 호출 순서
- Chrome 브라우저 사용 시, 참고할 수 있는 Internal Pages *chrome://webrtc-internals/*
- (개인) os와 브라우저 (Chrome ver. Test Local Network.app)
