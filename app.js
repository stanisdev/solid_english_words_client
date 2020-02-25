'use string'

const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const port = 4000;

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('main/index.html');
});

app.get('/admin/add', function(req, res) {
  res.render('admin/add.html');
});

app.listen(port);
console.log(`Web client was runned on ${port}`);