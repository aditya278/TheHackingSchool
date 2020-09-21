/*
    Primarily focused on parsing the URL and retrieving data from the Request  
*/

//Import All the Modules
const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

//Global Declarations
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    //Get the URL and Parse it
    const parsedUrl = url.parse(req.url, true);

    //Get the Path from the URL (for Routing)
    const pathName = parsedUrl.pathname;

    //Need to eliminate the empty / from the path name (Can be done using Regex)
    const trimmedPath = pathName.replace(/^\/+|\/+$/g, '');

    //Get the HTTP Method from the request.
    const method = req.method.toLowerCase();

    //Get Query Params (Here, since we parsed the URL by giving 2nd arg as 'true' we get the query params as an object)
    const queryStringObj = parsedUrl.query;

    //Get the Request Header as an Object
    const header = req.headers;

    //Get the Request Body (or Payload)
    const decoder = new stringDecoder('utf-8');
    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();
        console.log({pathName, trimmedPath, method, queryStringObj, header, buffer});
        
        res.end('Hello World!');
    })

});

server.listen(port, () => {
    console.log(`Server is listening at localhost:${port}`);
})