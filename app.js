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
// youtuber 전체 조회
app.get('/youtubers', (req, res) => {
    let youtubersObj = {};
    res.json(Array.from(db.values()));
    console.log(db);
});
//youtuber 개별(id) 조회
app.get('/youtubers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    res.json(db.get(id));
});
// youtuber 등록
app.post('/youtubers',(req, res) => {
    db.set(key_id++, req.body);
    res.json({ message: `${req.body.channelName}님, 유튜버 생활을 응원합니다!`});
    // res.send(req.body.channelName+'님, 유튜버 생활을 응원합니다!'); // .channelName, '님, 유튜버 생활을 응원합니다!'
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