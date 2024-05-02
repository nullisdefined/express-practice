const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3333);

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello express');
});

const db = new Map();
let key_id = 1;
// 유튜버 전체 조회
app.get('/youtubers', (req, res) => {
    let youtubersObj = {};
    res.json(Array.from(db.values()));
    console.log(db);
});
//유튜버 개별(id) 조회
app.get('/youtubers/:id', (req, res) => {
    const reqId = parseInt(req.params.id);
    const channelObj = db.get(reqId);
    if(channelObj) {
        res.json(channelObj);
    } else {
        res.json({ message: `요청하신 ${reqId}번은 없는 채널입니다.`});
    }
});
// 유튜버 등록
app.post('/youtubers',(req, res) => {
    db.set(key_id++, req.body);
    res.json({ message: `${req.body.channelName}님, 유튜버 생활을 응원합니다!`});
});
// 유튜버 전체 삭제
app.delete('/youtubers', (req, res) => {
    let msg = "";
    if(db.size) {
        db.clear();
        msg = "모든 채널이 삭제되었습니다.";
    } else {
        msg = "삭제할 채널이 존재하지 않습니다.";
    }
    res.json({ message: msg });
});
// 유튜버 개별(id) 삭제
app.delete('/youtubers/:id', (req, res) => {
    const reqId = parseInt(req.params.id);
    const channelObj = db.get(reqId);
    if(channelObj) {
        const channelName = channelObj.channelName;
        db.delete(reqId);
        
        res.json({ message: `${channelName} 채널이 삭제되었습니다.` });
    } else {
        res.json({ message: `요청하신 ${reqId}번은 없는 채널입니다.`});
    }
});
// 유튜버 개별(id) 수정
app.put('/youtubers/:id', (req, res) => {
    const reqId = parseInt(req.params.id);
    const newChannelName = req.body.channelName;
    let msg = "";
    if(db.get(reqId) === undefined) {
        msg = `요청하신 ${reqId}번은 없는 채널입니다.`;
    } else if(newChannelName === "") {
        msg = "채널명을 입력해주세요.";
    } else {
        const channelObj = db.get(reqId);
        const prevChannelName = channelObj.channelName;
        channelObj.channelName = newChannelName;
        db.set(reqId, channelObj);
        res.json(channelObj);
        msg = `채널명이 ${prevChannelName}에서 ${newChannelName}으로 변경되었습니다.`;
    }
    res.json({ message: msg });
});

app.use((req, res, next) => {
    res.status(404).send('404 ERROR');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.send('ERROR');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 서버 대기 중');
});