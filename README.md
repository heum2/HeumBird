# 🐤HeumBird
## 소개
`React`와 `Node`를 학습하기 위해 Instagram과 Twitter를 참고하여 만든 SNS 프로젝트입니다.

## 미리보기
### 이미지
![auth-page](https://github.com/heum2/HeumBird/blob/master/front/public/auth.png?raw=true)
![main-page](https://github.com/heum2/HeumBird/blob/master/front/public/main.png?raw=true)

### 영상
[![Video Label](http://img.youtube.com/vi/ZkAq3NuiOVM/0.jpg)](https://youtu.be/ZkAq3NuiOVM)

## 설치 및 실행
```bash
git clone https://github.com/heum2/HeumBird.git
```

### front
```bash
cd front
npm i
npm run dev
```

### back
```bash
cd back
npm i
npm run dev
```

## 기술 스택
- Language : JavaScript, CSS
- Library : React.js, Next.js, Express.js, Sequelize
- Database : MySQL
- Server : AWS EC2

## 기능 소개
### 주요기능
|기능|내용|
|---|-----|
|팔로우ㆍ팔로잉|사용자 간의 연결성을 강화하고 맞춤형 콘텐츠를 제공하는 기능|
|게시물 권한 설정|작성자들의 편의성에 맞게 게시물 조회 여부를 전체 공개, 팔로우들만, 비공개로 설정할 수 있는 기능|
|팔로우 추천|사용자가 팔로우, 팔로잉을 통해 연관성이 있는 다른 사용자를 추천해주는 기능|

### 상세기능
- 회원가입 / 로그인
- 게시물 CRUD
- 게시물 좋아요

## 폴더 구조
```bash
front
│  ├─components : 재사용 컴포넌트
│  ├─config : 환경 변수 관리
│  ├─containers : dispatcher 컴포넌트
│  ├─pages: 페이지 관련 코드
│  ├─public: 이미지 및 아이콘
│  ├─reducers: 전역 상태 관리
│  ├─sagas: 서버에서 데이터를 패치 후 전역 상태 변경
└─ └─styled: 스타일 컴포넌트

back
│  ├─config: sequelize 환경 설정
│  ├─migrations: Database 설정 변경 시 작성
│  ├─models: Database 테이블 생성 및 관계 설정
│  ├─passport: auth 인증
└─ └─routes: REST API 

lambda: AWS lambda
```

## 배운 점
- `React`를 활용하면서 작은 단위의 컴포넌트들을 조립하여 유연하고 모듈화된 코드를 작성할 수 있음을 배움
- `CSR`과 `SSR`의 차이점을 배움
- `AWS EC2`에 배포를 통해, 서버 인프라를 구축하는 경험을 쌓음.

## 개선사항
- `TypeScript`로 언어 변경이 필요
- 반응형 웹 디자인 개선이 필요
