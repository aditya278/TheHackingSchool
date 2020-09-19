const http = require("http");
const url = require("url");
const fs = require("fs");
const util = require("util");

const port = process.env.PORT || 8080;
const path = './CreateServerUsingHTTPModule/files';

//Using Promise:
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const appendFile = util.promisify(fs.appendFile);

const server = http.createServer((req, res) => {
    if(req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        console.log('favicon requested');
        return;
    }
    else {
    
        let q = url.parse(req.url, true).query;
        let username = q.username;
        let password = q.password;
        let userdata = q.userdata;
        const filePath = `${path}/${username}.txt`;
        let date = new Date();
        const out = `[${date.toLocaleString()}]: ${userdata}\n`;

        fs.access(filePath, (err) => {

            if(err) {
                
                const fileHeader = `UserName: ${username} Password: ${password}\n`;
            
                writeFile(filePath, (fileHeader + out))
                    .then(() => {
                        res.statusCode = 200;
                        res.end("<h1> Data Saved Successfully </h1>");
                    })
                    .catch((err) => {
                        res.statusCode = 500;
                        res.end("<h1> Data Save NOT Successfully </h1>");
                    });
            }
            else {
                
                    appendFile(filePath, out)
                    .then(() => {
                        res.statusCode = 200;
                        res.end("<h1> Data Appended to the file Successfully </h1>");
                    })
                    .catch((err) => {
                        res.statusCode = 500;
                        res.end("<h1> Data was NOT Appended to the file. </h1>");
                    });
            }
        });
    }
});

server.listen(port, () => {
    console.log(`Server Listening at: localhost:${port}`);
});
