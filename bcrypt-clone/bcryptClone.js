const crypto = require('crypto');

const bcryptClone = {};

bcryptClone.salt_length = 16;
bcryptClone.salt_offset = 0;

bcryptClone.genSalt = (saltRounds) => {
    
    try {
        let salt = '';
        let char = '';
        for(let i=0; i<2**saltRounds; i++) {
            salt = '';
            for(let j=0; j<bcryptClone.salt_length; j++) {
                char = Math.floor(Math.random()*32).toString(32);
                char = Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
                salt += char;
            }
        }
        return Promise.resolve(salt);
    }
    catch(err) {
        return Promise.reject(err);
    }
    
}

bcryptClone.genHmac = (plainText) => {
    return crypto.createHmac('sha1', "randomkey").update(plainText).digest("hex");
}

bcryptClone.hash = async (plainText, saltOrRound) => {
    
    try {
        if(!saltOrRound)
            return Promise.resolve(bcryptClone.genHmac(plainText));

        let hashedStr = null;
        if(typeof saltOrRound === 'number') {

            //Need to generate the salt too..
            const salt = await bcryptClone.genSalt(saltOrRound);
            hashedStr = salt + bcryptClone.genHmac(plainText + salt);
            return Promise.resolve(hashedStr);
        }

        if(typeof saltOrRound === 'string') {
            hashedStr = saltOrRound + bcryptClone.genHmac(plainText + saltOrRound);
            return Promise.resolve(hashedStr);
        }
    }
    catch(err) {
        return Promise.reject(err);
    }
}

bcryptClone.compare = async (plainText, hashedText) => {
    try {
        const salt = hashedText.substr(bcryptClone.salt_offset, bcryptClone.salt_length);
        const newHashedStr = await bcryptClone.hash(plainText, salt);

        if(newHashedStr === hashedText)
            return true;
        return false;
    }
    catch(err) {
        return err;
    }
}

module.exports = bcryptClone;