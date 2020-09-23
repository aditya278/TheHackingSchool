/*
    We are going to define all the methods to perform the CRUD operations in this File.
    (Actual API methods)
*/

const fs = require('fs');
const path = require('path');

const lib = {}      //Object containing all the Library methods

//Create a property called baseDir which is the base Directory for the files being created.
lib.baseDir = path.join(__dirname, '/../.data');
/*
    __dirname   : current directory name (like pwd)
    ../         : going back 1 directory in linux
*/

//Now, we're going to create the CRUD Method of the lib object

lib.create = (dir, file, data, callback) => {
    
    const filePath = `${lib.baseDir}/${dir}/${file}.json`;
    
    if(!fs.existsSync(filePath)) {
        const stringData = JSON.stringify(data);
        fs.writeFile(filePath, stringData, (err) => {
            if(!err)
                callback(false);
            else 
                callback('Error encountered while writing the file!');
        });
    }
    else {
        callback('The File Already Exists!');
    }
}

lib.read = (dir, file, callback) => {
    
    const filePath = `${lib.baseDir}/${dir}/${file}.json`;

    fs.readFile(filePath, 'utf-8', (err, data) => {
        callback(err, data);
    })
}

lib.update = (dir, file, data, callback) => {
    
    const filePath = `${lib.baseDir}/${dir}/${file}.json`;

    if(fs.existsSync(filePath)) {
        const stringData = JSON.stringify(data);
        fs.writeFile(filePath, stringData, (err) => {
            if(!err)
                callback(false);
            else 
                callback('Error encountered while updating the file!');
        });
    }
    else {
        callback('The File Doesn\'t Exist');
    }
}

lib.delete = (dir, file, callback) => {
    
    const filePath = `${lib.baseDir}/${dir}/${file}.json`;

    fs.unlink(filePath, (err) => {
        if(!err)
            callback(false);
        else
            callback('Error in deleting the file!');
    })
}

module.exports = lib;