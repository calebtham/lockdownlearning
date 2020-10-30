var express = require('express')
var app = express()
var path = require('path')
var PORT = process.env.PORT || 3000

var http = require('http');
var server = http.Server(app);

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
