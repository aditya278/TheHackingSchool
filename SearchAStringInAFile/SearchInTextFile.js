const fs = require('fs');
const util = require('util');
const readlineSync = require('readline-sync');

const filePath = `./SearchAStringInAFile/emailList.txt`;

let userInput = readlineSync.question("Enter the Email ID to search: ");
//userInput = 'aditya.shukla278@.com';

const readFile = util.promisify(fs.readFile);

function replaceEscapeChars(str) {
    let newStr = ['^'];
    for(let i=0; i<str.length; i++) {
        if(str[i].match(/[|\\{}()[\]^$+*?.@]/)) {
            newStr.push('\\');
            newStr.push(str[i]);
        }
        else {
            newStr.push(str[i]);
        }
    }
    newStr.push('$');
    return newStr.join('');
}

async function checkEmailInFile() {
    try {
        //userInput = replaceEscapeChars(userInput);
        console.log("User Input: " + userInput);
        let re = new RegExp(userInput);
        let fileData = await readFile(filePath);
        console.log("Data: "+ fileData);

        // if(fileData.includes(userInput)) {
        //     console.log("FOUND!");
        // }
        // else {
        //     console.log("NOT FOUND!");
        // }

        if(re.test(fileData.toString())) {
            console.log("Email ID Present!");
        }
        else {
            console.log("No such Email ID Present!");
        }
    }
    catch(err) {
        console.log("Something is wrong! : Error: " + err.message);
    }
}

checkEmailInFile();