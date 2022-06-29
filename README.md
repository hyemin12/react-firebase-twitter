# twitter clone

<a href="#" target="_blank"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZhFQN%2FbtrEZedyP5T%2F9ANH2jcfgq4kdbXA98FKQK%2Fimg.png" /></a>

이미지를 클릭하면 사이트로 이동합니다.

<br>
<hr>
<br>

노마드코더의 트위터 클론코딩 강의를 수강하며 제작한 프로젝트. firebase와 react를 사용하여 제작하였다.

https://nomadcoders.co/nwitter/lobby
https://console.firebase.google.com/u/0/?hl=ko
<br>
<br>

<hr>
<br>

## 기능

1. 회원가입 / 로그인 / 로그아웃 (구글 및 깃허브 연동)
2. 새로운 트윗 작성 기능, 사진 첨부 가능
3. 작성된 트윗 확인 및 수정 삭제 기능

## 페이지 구성

### 1. 회원가입

<br>

<img src="https://github.com/hyemin12/react-firebase-twitter/blob/master/readmeImg/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.JPG?raw=true" width="200px" />

1.유저 이름, 이메일, 비밀번호를 입력하여 가입할 수 있음.<br> 2.소셜 (구글, 깃허브)와 연동하여 회원 가입 가능

<br>
<hr>
<br>

### 2. 홈

<br>

네비게이션, 새로운 트윗작성 섹션, 작성된 트윗 목록(타임라인)으로 구성<br>
왼쪽 하단 버튼을 클릭하면 로그아웃 됨
<br>
<br>
<img src="https://github.com/hyemin12/react-firebase-twitter/blob/master/readmeImg/%ED%99%88.JPG?raw=true" width="300px" />
<br>
<br> 1)새로운 트윗 작성
<br>
<img src="https://github.com/hyemin12/react-firebase-twitter/blob/master/readmeImg/%ED%8A%B8%EC%9C%97%EC%9E%91%EC%84%B1.JPG?raw=true" width="300px" />
텍스트와 사진 첨부하여 새로운 트윗 작성 가능
<br>
<br>

2)타임라인(트위터 목록확인)
<br>
<img src="./readmeImg/타임라인.jpg" width="300px" /> -작성된 트윗 목록을 확인할 수 있으며,
작성한 트윗 내용을 수정, 삭제할 수 있음

-작성자 일치 여부를 확인하고, 일치할 경우 수정 삭제 버튼이 추가로 나타남
<img src="https://github.com/hyemin12/react-firebase-twitter/blob/master/readmeImg/%EC%88%98%EC%A0%95%EC%82%AD%EC%A0%9C.JPG?raw=true" width="300px" /> -수정 화면
<img src="https://github.com/hyemin12/react-firebase-twitter/blob/master/readmeImg/%EC%88%98%EC%A0%95.JPG?raw=true" width="300px" />
<br>
<br>

### 3. 마이페이지

유저가 작성한 트윗들을 모아볼 수 있으며, 프로필을 수정할 수 있음<br>
이외의 기능들은 서비스 준비중
<br>
<br>
<img src="https://github.com/hyemin12/react-firebase-twitter/blob/master/readmeImg/%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80.JPG?raw=true" width="300px" />

1)프로필 수정
<br>
<img src="https://github.com/hyemin12/react-firebase-twitter/blob/master/readmeImg/%ED%94%84%EB%A1%9C%ED%95%84%EC%88%98%EC%A0%95.JPG?raw=true" width="300px" /> -유저의 프로필 이미지, 백그라운드, 유저 네임 수정 가능
