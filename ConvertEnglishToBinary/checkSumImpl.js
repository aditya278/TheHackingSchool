const convertToBinary = require('./convertEnglishToBinary.js');
const checksumGen = require('./errorDetectionChecksum');

function sendData(inputString) {
    var binList = convertToBinary.driver(inputString);
    var checkSum = checksumGen.findChecksum(binList);
    binList.push(checkSum);
    return binList;
}

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