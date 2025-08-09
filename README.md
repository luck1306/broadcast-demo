# WebRTC Broadcast platform

이 프로젝트는 WebRTC를 사용해 간이 방송 플랫폼을 구현함. 아래 게시글을 기반으로 개발되었음

<a href=" https://medium.com/@fengliu_367/getting-started-with-webrtc-a-practical-guide-with-example-code-b0f60efdd0a7">원 게시글</a>

### 주요 API

- <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia">getUserMedia</a> 접속한 장치의 별도의 입력장치를 가져온다. (e.g. microphone, camera)
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection">RTCPeerConnection</a> WebRTC에서 가장 주된 API로 종단 간 연결에 사용된다.

### 기본 설정

<span style="color: red;">※ 주의 사항 : getUserMedia() 함수는 "https" 환경에서만 유효합니다. 이 프로젝트에서는 mkcert를 통해 내부망에서 검증했지만 서비스로 응용하기 위해 별도로 인증서를 발급받아 추가해야합니다.</span>

<details>
<summary>mkcert 적용 예제</summary>
<div markdown="1">
<a href="https://github.com/FiloSottile/mkcert">mkcert github</a>

<blockquote>README에는 rootCA-key.pem 파일이 장치의 안전한 요청을 완전히 가로채는 권한이 부여되어 있기에 공유 금지 주의가 기재됬지만 필자의 테스트 환경에서 한 장치에서 rootCA.pem & rootCA-key.pem을 생성 후 두 파일을 테스트할 장치에 공유해 LAN내의 https 환경을 구축했다.</blockquote>
<details>
<summary><span style="color:red;">여담</span></summary>
<div markdown="1">
<span style="color: red;"><i>"mkcert -install"로 생성되는 "rootCA.pem"과 "rootCA-key.pem"의 각각의 의미로 "rootCA.pem"은 암호화 통신에서 공개 키를 포함한 인증서로 암호화 통신을 요청할 클라이언트와 서버모두 필요로하며, "rootCA-key.pem"은 개인 키를 포함하며 "rootCA.pem"을 발급한 주체(서버)만 소유해야 한다. <span style="text-decoration: line-through;">위와 같은 내용을 모른채 둘 다 테스트 기기에 붙여넣어 테스트가 끝날 때까지 mkcert의 경고를 이해하지 못했다.</span></i></span>
</div>
</details>

<b>테스트 장치</b>

- 맥북x1
- 데스크탑x2
- 아이폰x1

1. homebrew로 맥에서 mkcert를 설치 후 rootCA.pem & rootCA-key.pem을 발급받음
2. usb로 각 데스크탑으로 옮김(아이폰은 airdrop으로)
3. 데스크탑
   - 모두 windows 환경
   - "WinGet"이 아닌 "Chocolatey" Package Manager를 사용함(단순히 mkcert 문서에 Chocolatey가 적혀있었기 때문, WinGet은 시도해보지 않음)
   - "mkcert -install" 입력
   - "mkcert -CAROOT"로 rootCA.pem 및 rootCA-key.pem이 있는 폴더의 경로 산출 후 해당하는 경로에 맥북의 rootCA.pem를 덮어씀
4. 아이폰
   - airdrop으로 rootCA.pem을 전송
   - 파일 앱에서 전송받은 rootCA.pem을 열어 설치
   - "설정 > 일반 > VPN 및 기기 관리"에서 설치한 인증서를 등록
   - "설정 > 일반 > 정보 > 인증서 신뢰 설정"에서 등록한 인증서 승인

</div>
</details>

### RTCPeerConnection의 SDP(Session Description Protocol) 교환 시퀀스 다이어그램

### 팁

- RTCPeerConnection의 track 이벤트의 원활한 송수신을 위한 메서드 호출 순서
- Chrome 브라우저 사용 시, 참고할 수 있는 Internal Pages _chrome://webrtc-internals/_
- (개인) os와 브라우저 (Chrome ver. Test Local Network.app)
