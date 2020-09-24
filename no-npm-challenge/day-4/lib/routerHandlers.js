const _data = require('./data');
const helpers = require('./helpers');

//Implementing the Router Handlers
const handlers = {}

//Router Handler for /users
handlers.users = (data, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    }
    else {
        callback(405, {'Error' : 'Invalid HTTP method. Request Failed.'});
    }
}

handlers._users = {};

//Implementing the POST method for /users
//Required Data(User Schema): firstName, lastName, phoneNumber(unique), password, tocAgreement
//Optional Data : None
handlers._users.post = (data, callback) => {
    //Convert the data.payload to a JSON object
    data.payload = JSON.parse(data.payload);

    //Implement the Validation, check for all required fields
    const firstName = typeof data.payload.firstName === 'string' && data.payload.firstName.trim().length > 0
                    ?   data.payload.firstName.trim() : false;
    const lastName = typeof data.payload.lastName === 'string' && data.payload.lastName.trim().length > 0
                    ?   data.payload.lastName.trim() : false;
    const phoneNumber = typeof data.payload.phoneNumber === 'string' && data.payload.phoneNumber.length === 10
                    ?   data.payload.phoneNumber : false;
    const password = typeof data.payload.password === 'string' && data.payload.password.length > 8
                    ?   data.payload.password : false;
    const tocAgreement = typeof data.payload.tocAgreement === 'boolean' && data.payload.tocAgreement === true
                    ?   true : false;

    if(firstName && lastName && phoneNumber && password && tocAgreement) {
        
        //Lets hash the password
        const hashedPassword = helpers.hash(password);
        if(hashedPassword) {
            //Create the Final User Object to store in the disc
            const userObject = {
                'firstName' : firstName,
                'lastName' : lastName,
                'phoneNumber' : phoneNumber,
                'hashedPassword' : hashedPassword,
                'tocAgreement' : tocAgreement
            }
        

            _data.create('users', phoneNumber, userObject, (err) => {
                if(!err) {
                    callback(200, {'Success' : 'User Registered Successfully'});
                }
                else {
                    callback(400, {'Error' : 'A User with this Phone number already exists'});
                }
            })
        }
        else {
            callback(500, {"Error" : "Could not hash the password"});
        }
    }
    else {
        callback(400, {'Error' : 'Validation Failed / Missing Fields!'});
    }
}

//for URL/sample route
handlers.sample = (data, callback) => {
    //This callback returns the HTTP Status code and a payload function
    callback(200, {'status' : 'success "/sample"'});
}

//For all other routes
handlers.notFound = (data, callback) => {
    callback(404, {'status' : 'Not Found'});
}


module.exports = handlers;