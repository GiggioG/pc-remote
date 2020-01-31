const http = require("http");
const fs = require("fs");
let server = http.createServer((req, res) => {
    if (req.url == "/") {
        let rs = fs.createReadStream(`${__dirname}/index.html`);
        rs.pipe(res);
    } else {
        res.end(req.url + " 404");
    }
});
server.listen(8080);