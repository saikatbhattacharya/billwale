var express = require('express');
var app = express();
var routes = require('./router.js');

routes(app);

app.listen(process.env.PORT||4000);