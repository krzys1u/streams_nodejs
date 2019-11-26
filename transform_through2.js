const fs = require("fs");
const through = require("through2");


fs.createReadStream("./data.txt")
    .pipe(through(toUpper))
    .pipe(process.stdout);

function toUpper(buffer, encoding, next) {
    //next(err, data)
    this.push(buffer.toString().toUpperCase());
    next();
}
