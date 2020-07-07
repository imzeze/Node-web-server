var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser('123ABC!'));

app.use('/', (req, res) => {
  if(req.signedCookies.key) {
    res.send(`{key : ${req.signedCookies.key}}`)
  } else {
    res.cookie('key', 'value', {signed : true})
    res.end()
  }
});

module.exports = app;
