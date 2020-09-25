const crypto = require('crypto');
const config = require('../config1');

const helpers = {};

//Hashing Function
helpers.hash = (str) => {
    if(typeof str === 'string' && str.length > 0) {
        const hash = crypto.createHash('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;
    }
    else {
        return false;
    }
}

//Parse Buffer to Object
helpers.parseJsonToObject = (str) => {
    try {
        const jsonObject = JSON.parse(str);
        return jsonObject;
    }
    catch(err) {
        return {};
    }
}

module.exports = helpers;