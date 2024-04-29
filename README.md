# REST API 설계
## 유튜버 관리 API
이 API는 유튜버 정보 관리를 목적으로 합니다.
## 기능
- 유튜버 등록
- 유튜버 개별 조회
- 유튜버 전체 조회

## 사용 방법
### 1. 유튜버 등록
- `POST /youtubers`
- 요청 본문:
```JSON
{
  "channelName": "string"
}
```
- 응답:
```JSON
{
  "message": "string"
}
```
### 2. 유튜버 개별 조회
- `GET /youtubers/:id`
- 파라미터:
  - `id`: 유튜버 ID(숫자)
- 응답:
```JSON
{
  // 유튜버 정보 (객체)
}
```
### 3. 유튜버 전체 조회
- `GET /youtubers`
- 응답:
```JSON
[
  // 유튜버 정보 (객체 배열)
]
```
