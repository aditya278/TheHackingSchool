/*
Day-5: Implement REST Methods using Routers.
*/

//Import all the modules
const http = require('http');
const https = require('https');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const config = require('./config1.js');
const fs = require('fs');
const _data = require('./lib/data.js');
const handlers = require('./lib/routerHandlers.js'); //Imported the Handlers object

//Global Declaration
const httpPort = config.httpPort;
const httpsPort = config.httpsPort;

const server = http.createServer((req, res) => {
    unifiedServer(req, res);
});

//This is a HTTP Server
server.listen(httpPort, () => {
    console.log(`Server started at ${httpPort} in ${config.envName} mode`);
});

//Reading Synchronously becasue https wont work without cert
const httpsServerOptions = {
    // 'key' : fs.readFileSync('./https/key.pem'),
    // 'cert': fs.readFileSync('./https/cert.pem')
}

const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
    unifiedServer(req, res);
});


//This is a HTTPs Server
httpsServer.listen(httpsPort, () => {
    console.log(`Server started at ${httpsPort} in ${config.envName} mode`);
})

const unifiedServer = (req, res) => {

    //Get the URL and Parse it.
    const parsedUrl =  url.parse(req.url, true);

    //Get the path (for routing):
    const path = parsedUrl.pathname;

    //Eliminate empty / with regex:
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');

    //Get the HTTP Method:
    const method = req.method.toLowerCase();

    //Get Query Params (as an object, because of 'true' in url.parse()):
    const queryStringObject = parsedUrl.query;

    //Get the Headers as an Object:
    const headers = req.headers;

    //Get Body(Payload):
    const decoder = new stringDecoder('utf-8');
    let buffer = '';

    req.on('data', (data) => {      //Capture the Data event!
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        const data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        }


        //Add Router logic here..
        //Choose the handler where request should go according to the route path
        const chosenHandler = typeof(router[trimmedPath]) != 'undefined' ? router[trimmedPath] : handlers.notFound;

        //This chosenHandler is now a callback function
        chosenHandler(data, (statusCode, payload) => {
             //Use the statusCode callback by the handler or 200
             statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

             //Use the payload called back by the handler or default to an empty object
             payload = typeof(payload) == 'object' ? payload : {};
 
             //Convert the payload to a string
             payloadString = JSON.stringify(payload);
 
             //Send the final response
             res.setHeader('Content-Type', 'application/json');
             res.writeHead(statusCode);
             res.end(payloadString);
             console.log(statusCode, payloadString);
        });
    });

};


//Now, need to implement the Router
const router = {
    'sample' : handlers.sample,
    'users'  : handlers.users
}