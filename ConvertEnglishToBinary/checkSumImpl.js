/*
Problem: Part -1: Write an Algorithm to extract input English Language sentence characters 
and convert the characters to the 8-bit BINARY patterns.
Import the ASCII Object attached into your source code.
Solution: Created the convertEnglishToBinary.js file.

Part -2: Implement Checksum error detection algorithm by creating a sender and a reciever.
Compute the checksum at the sender's end and at the reciever's end, and validate if there was an error
in transmission.
*/

const convertToBinary = require('./convertEnglishToBinary.js');
const checksumGen = require('./errorDetectionChecksum');

/*Send Data method is basically a template for the sender side, it calls the driver() function to
convert english to binary list. It later sends the binary list to findChecksum() function to
get the checksum*/
function sendData(inputString) {
    var binList = convertToBinary.driver(inputString);
    var checkSum = checksumGen.findChecksum(binList);
    binList.push(checkSum);
    return binList;
}

/*Recieve Data method is basically a template for the Reciever side, it calls the findChecksum() function to
get the checksum. If the checksum at reciever's end contains a '1' bit, then it means that there was some
error during transmission of data.*/
function recieveData(binList) {
    var errorFound = false;
    var checkSum = checksumGen.findChecksum(binList);
    if(checkSum.indexOf('1') > -1) {
        errorFound = true;
    }
    console.log("Checksum on reciever's end is: "+ checkSum);
    return !errorFound;
}


var lst = sendData("CO/DE 2019");
console.log("Sent data is: ")
console.log(lst);
var res = recieveData(lst);
console.log("Checksum result: "+ res);