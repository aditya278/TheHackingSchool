#### Code for Converting English Sentence chacacters to a Binary List.

##### Problem Statement: 
Part -1: Write an Algorithm to extract input English Language sentence characters 
and convert the characters to the 8-bit BINARY patterns.
Import the ASCII Object attached into your source code.
Solution: Created the convertEnglishToBinary.js file.

Part -2: Implement Checksum error detection algorithm by creating a sender and a reciever.
Compute the checksum at the sender's end and at the reciever's end, and validate if there was an error
in transmission.

##### convertEnglishToBinary.js
The Input is provided to the ```driver()``` function in a form of a string.

To run the code for only convertEnglishToBinary.js,
1. Need to modify the code and remove the module.exports from the name of the function.
2. use the below command:
```javascript
node convertEnglishToBinary.js
```

##### checkSumImpl.js
The Input needs to be provided to the ```sendData()``` function.
Send Data function is basically a template for the sender side, it calls the driver() function to convert english to binary list. It later sends the binary list to findChecksum() function to get the checksum.

Recieve Data method is basically a template for the Reciever side, it calls the findChecksum() function to get the checksum. If the checksum at reciever's end contains a '1' bit, then it means that there was some error during transmission of data.

To run the code, use the below command:
```javascript
node checkSumImpl.js
```