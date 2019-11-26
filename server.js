var http = require("http");
var fs = require("fs");
var zlib = require("zlib");
var split2 = require('split2');
const through = require("through2");

const getTitle = parsed => {

  return parsed.title;
}

function filter(obj, encoding, next) {
  const parsed = JSON.parse(obj);

  if (getTitle(parsed).includes('JavaScript')) {
    this.push(JSON.stringify({title: parsed.title}) + '\n')
  }
  next();
}


var server = http.createServer(function(req, res) {
  if(req.method === "POST") {
    req
      .pipe(zlib.createGunzip())
      .pipe(split2())
      .pipe(through.obj(filter))
      .pipe(res)

  } else {
    res.setHeader("content-type", "text/plain");
    fs.createReadStream("./tmp.log").pipe(res);
  }
});
server.listen(4000);