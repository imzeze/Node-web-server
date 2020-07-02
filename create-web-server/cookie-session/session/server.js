const http = require("http");
const url = require("url");
const qs = require("querystring");
const fs = require("fs");

const parsingCookie = (cookie='') => 
    cookie.split(";")
          .map(v => v.split("="))
          .map(([k, ...v]) => [k, v.join("=")])
          .reduce((acc, [k,v]) => {
            acc[k.trim()] = encodeURIComponent(v);
            return acc;
          }, {});

const session = {};

http.createServer((req, res) => {
    const cookies = parsingCookie(req.headers.cookie)
    
    if(req.url.startsWith("/login")) {
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);

        const randomInt = +new Date();
        session[randomInt] = {
            name,
            expires,
        }
        res.writeHead(302, {
            Location : "/",
            'Set-Cookie' : `session=${randomInt};Expires=${expires.toGMTString()};HttpOnly;Path='/'`,
        });
        res.end();
    } else if (cookies.session && session[cookies.session].expires > new Date()) {
        res.writeHead(200, {
            'Content-Type' : 'text/html;charset=utf-8'
        });
        res.end(session[cookies.session].name);
    } else {
        fs.readFile(`${__dirname}/main.html`, (err, data) => {
            if(err) {
                throw err;
            } else {
                res.end(data);
            }
        });
    }
}).listen(3001);