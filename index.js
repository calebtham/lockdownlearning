var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 3000;

var http = require('http');
var server = http.Server(app);

var tutors = require('./tutors.json');

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json({limit:'1mb'}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.post('/api', (req, res) => {
  res.json(tutors);
});