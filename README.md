# REST API 설계
## 유튜브 채널 관리

## 기능
- 유튜브 채널 등록
- 유튜브 채널 조회
- 유튜브 전체 채널 조회
- 유튜브 채널 삭제
- 유튜브 전체 채널 삭제
- 유튜브 채널명 수정

## 사용 방법
### 1. 유튜브 채널 등록
- `POST /youtubers`
- 요청 본문:
```JSON
{
  "channelName": "string"
}
```

### 2. 유튜브 채널 조회
- `GET /youtubers/:id`
- 파라미터:
  - `id`: 유튜브 채널 ID(숫자)

### 3. 유튜브 전체 채널 조회
- `GET /youtubers`

### 4. 유튜브 채널 삭제
- `DELETE /youtubers/:id`
- 파라미터:
  - `id`: 유튜브 채널 ID(숫자)

### 5. 유튜브 전체 채널 삭제
- `DELETE /youtubers`

### 6. 유튜브 채널명 수정
- `PUT /youtubers/:id`
- 파라미터:
  - `id`: 유튜브 채널 ID(숫자)
- 요청 본문:
```JSON
{
  "channelName": "string"
}
```
