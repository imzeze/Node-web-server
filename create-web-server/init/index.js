const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
        if(err) {
            throw err;!
        } 
        res.end(data);
    });
}).listen(3001, () => {
    console.log('server : 3001포트에서 요청 대기 중')
});