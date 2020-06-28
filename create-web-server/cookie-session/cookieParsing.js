const http = require('http');
const fs = require('fs');

const parseCookies = (cookie = '') => { //cookie default 값을 ''으로 설정
    cookie.split(';')
          .map(v => v.split('='))
          .map(([k, ...vs]) => [k, vs.join('=')])
          .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
          },{});
};

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    res.writeHead(200, {'Set-Cookies': 'myCookie=test'});
    res.end("Hello Cookie");
}).listen(3001, () => {
    console.log('server : 3001포트에서 요청 대기 중')
});