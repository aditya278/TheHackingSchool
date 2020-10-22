const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');

function findFilesInDir(dirPath) {
    try {
        if(!(fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory())) {
            return null;
        }
        const dirObj = {};
        let baseName = '';
        const files = fs.readdirSync(dirPath);
        for(let i=0; i<files.length; i++) {
            baseName = files[i];
            dirObj[baseName] = findFilesInDir(dirPath + '/' + files[i]);
        }
    
        return dirObj;
    }
    catch(err) {
        return null;
    }
}

function main() {
    let dirPath = readlineSync.question('Enter the full path: ');
    console.log(dirPath);
    if(!(fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory())) {
        console.log("This is not a directory");
        return;
    }

    let dirObj = {};
    let fileName = path.basename(dirPath);
    dirObj[fileName] = findFilesInDir(dirPath)
    console.log(dirObj);
    dirObj = JSON.parse(JSON.stringify(dirObj));

    console.log(dirObj);
}

main();