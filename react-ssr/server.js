/**
 * Created by 王冬 on 2018/3/26.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 *
 */

var express = require('express');
var app = express();

var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var App = require('./App');

app.get('/', function (req, res) {
    var html = ReactDOMServer.renderToString(<App/>);

    res.end(html);
});

app.listen(3000, function () {
    console.log('running on port ' + 3000);
});