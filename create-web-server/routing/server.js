const http = require("http");
const fs = require("fs");

const users = {};

http.createServer((req, res) => {
    if(req.method === 'GET') {
        if(req.url === '/') {
            return fs.readFile(`${__dirname}/restFront.html`, (err, data) => {
                if(err) {
                    throw err;
                } else {
                    res.end(data);
                }
            });
        } else if (req.url === '/about') {
            return fs.readFile(`${__dirname}/about.html`, (err, data) => {
                if(err) {
                    throw err;
                } else {
                    res.end(data);
                }
            });
        } else if (req.url === '/users') {
            return res.end(JSON.stringify(users));
        }
    } else if (req.method === 'POST') {
        if(req.url === '/users') {
            let body = '';
            req.on('data', (data) => {
                body += data;
            })
            return req.on('end', () => {
                console.log(body);
                const {name} = JSON.parse(body);
                const id = +new Data();
                users[id] = name;
                res.writeHead('201');
                res.end('등록 성공');
            })
        }
    } else if (req.method === 'PUT') {
        if(req.url.startsWith('/users')) {
            const key = req.url.split("/")[2];
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            return req.on('end', () => {
                users[key] = JSON.parse(body).name;
                return res.end(JSON.stringify(users))
            })
        }
    } else if (req.method === 'DELETE') {
        if (req.url.startsWith('/users')) {
            const key = req.url.split('/')[2];
            delete users[key];
            return res.end(JSON.stringify(users));
        }
    }
    res.writeHead(404, 'not found');
    return res.end('not found');
}).listen(3001);