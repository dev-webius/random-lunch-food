# 랜덤 점심메뉴 추천 APP (교대편)

~~[Random Food](https://random-food.webius.net)~~

[Demo](https://demo-random-food.webius.net)

## 프로젝트 소개
* 목표 - 배달 / 나가서 먹기를 선택하고 카테고리를 선택하면 메뉴를 랜덤으로 추첨하는 서비스  
* 주요 기능 - 카테고리 ON/OFF 기능, 추첨하는 과정이 시각적으로 표시되어야 함. 관리자 페이지 제공  
* 작업 기간 - 2022년 08월 (약 1달)
* 작업 배분
    - 개발자 김예승:
        1) 프론트엔드 / 백엔드 개발 환경 기본 세팅
        2) 리액트와 리액트 라우터를 활용한 화면 구성
        3) DB 테이블 설계
        4) 파일 업로드 기능 구현
        5) Gradle 활용한 배포 환경 구현 (Spring Boot + React Deploy)
    - 개발자 방진혁:
        1) SQL Statement 작성
        2) Spring Boot 에서 Mapper / Entity / Service 인스턴스 구현
        3) RestController 구현 및 프론트엔드 아웃풋 연동

## 프로젝트 디렉터리 구조
* `api` - Spring Boot, RestController 활용한 API Server 구현
* `app` - React, React Router 활용한 Client 구현

## 웹 사이트 구조
* `/` - Random Food APP 메인
* `/delivery` - 배달 선택
* `/walk` - 나가서 먹기 선택
* `/select` - 추첨 화면
* `/result` - 결과 화면
* `/manage` - 스토어 관리 화면
* `/api` - API

## 기술 스택

### API Server
* Spring Boot
* MyBatis
* MariaDB
* Gradle WAR Deploy

### APP
* React
* React Router
* React Native (WebView Simple Application)
* SCSS

### Deploy
* AWS EC2
* Ubuntu
* Tomcat