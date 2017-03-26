var express = require('express');

var info = require('./routes/info');

var app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.get('/', function (req, res) {

      res.send("Hi v.6.cn");
});


app.get("/info", info.get)

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});
