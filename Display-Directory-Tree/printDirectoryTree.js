const fs = require('fs');
const path = require('path');
const readlineSync = require('readline-sync');

function displayTree(dirPath, baseIndent = 0, filter = null) {
    let fileName = path.basename(dirPath);
    let indent = ' ';
    for(let i=0; i<baseIndent; i++) {
        indent += '|\t';
    }
    console.log(indent+"|-- " + fileName);
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        
        if(file.match(filter))
            return;

        let childPath = dirPath + '/' + file;
        const isDir = fs.lstatSync(childPath).isDirectory();
        if(isDir) {
            displayTree(childPath,baseIndent+1, filter);
        }
        else {
            console.log(indent+'|\t|-- ' + file);
        }
    });
}

const fullPath = readlineSync.question("Please Enter the Full Path of the directory: ");
if(!(fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()))
    console.log("This is not a correct path/directory");
else    
    displayTree(fullPath, 0, /^.*\.git$|node_modules/);  //Not displaying the contents of .git and node_modules folder