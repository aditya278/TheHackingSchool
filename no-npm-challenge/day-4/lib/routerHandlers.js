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

//GET Method for /users
//Required Data (Query Params): Phone Number
//Optional Data : none
//It is a private route, only logged in users can query user data
handlers._users.get = (data, callback) => {
    //Check if phone is valid
    console.log(data.queryStringObject.phoneNumber);
    const phoneNumber = typeof data.queryStringObject.phoneNumber === 'string' && data.queryStringObject.phoneNumber.length === 10 ? data.queryStringObject.phoneNumber : false;
    
    console.log(phoneNumber);
    if(phoneNumber) {
        _data.read('users', phoneNumber, (err, fileData) => {
            if(!err && fileData) {
                delete fileData.hashedPassword;
                callback(200, fileData);
            }
            else {
                callback(400, {'Error' : 'There is no user available with this Number!'});
            }
        });
    }
    else {
        callback(400, {'Error' : 'Validation Failed / Missing Fields!'});
    }
}

//PUT Method for /users
//Required Data (body): Phone Number
//Optional Data : Rest of the fields
//It is a private route, only logged in users can query user data
handlers._users.put = (data, callback) => {
    const phoneNumber = typeof(data.payload.phoneNumber) === 'string' && data.payload.phoneNumber.length === 10 ? data.payload.phoneNumber.trim() : false;
    //Check for optional FIelds
    const firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const password = typeof(data.payload.password) === 'string' && data.payload.password.length > 6 ? data.payload.password : false;


    if(phoneNumber) {
        if(firstName || lastName || password) {
            _data.read('users', phoneNumber, (err, userData) => {
                if(!err && userData) {
                    if(firstName)
                        userData.firstName = firstName;
                    if(lastName)
                        userData.lastName = lastName;
                    if(password)
                        userData.password = helpers.hash(password);
                    
                    _data.update('users', phoneNumber, userData, (err) => {
                        if(!err) {
                            callback(200, {'Success' : 'Record Updated'});
                        }
                        else {
                            callback(500, {'Error' : 'Server Error. Please try later'});
                        }
                    })
                }
                else {
                    callback(400, {'Error' : 'The Specified User Doesnt exist.'});
                }
            })
        }
        else {
            callback(400, {'Error': 'Mssiing fields required to update'});    
        }
    }
    else {
        callback(400, {'Error': 'Validation Failed / Mssiing required Fields'});
    }
}

//DELETE Method for /users
//Required Data (Query Params): Phone Number
//Optional Data : none
//It is a private route, only logged in users can query user data
handlers._users.delete = (data, callback) => {
    //Check if Phone number is Valid
    const phoneNumber = typeof(data.queryStringObject.phoneNumber) === 'string' && data.queryStringObject.phoneNumber.length === 10 ? data.queryStringObject.phoneNumber.trim() : false;
    if(phoneNumber) {
        //Look for the user.
        _data.read('users', phoneNumber, (err, fileData) => {
            if(!err && fileData) {
                _data.delete('users', phoneNumber, (err) => {
                    if(!err) {
                        callback(200, {"Success" : "User Deleted Successfully"});
                    }
                    else {
                        callback(500, {"Error" : "User Deletion Failed"});
                    }
                })
            }
            else {
                callback(400, {'Error' : 'There is no user available with this Phone number!'});
            }
        })
    }
    else {
        callback(400, {"Error" : "Validation Failed / Missing Fields!"});
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