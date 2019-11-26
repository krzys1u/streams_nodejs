var http = require("http");
var fs = require("fs");
var zlib = require("zlib");

var post = http.request({
  method: "POST",
  host: "localhost",
  port: 4000,
  url: "/"
}, function (res) {
  console.log(res.statusCode);
  res.pipe(process.stdout);
});

fs.createReadStream("./books.import.txt")
  .pipe(zlib.createGzip())
  .pipe(post);

