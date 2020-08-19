module.exports.driver = function (inputString) {
    if(typeof inputString != 'string') {
      inputString = inputString.toString();
    }
    //Creating an ASCII Object
    var asciiObj = {};
    for(var i=0; i<=127; i++) {
      asciiObj[String.fromCharCode(i)] = i;
    }
  
    //Converting the String to a List of ASCII Characters
    var asciiList = getAsciiList(inputString, asciiObj);
    
    var len = asciiList.length;
    var binList = [];
    for(var i=0; i<len; i++) {
      
      //Converting each number to it's equivalent Binary
      var b = getBinary(asciiList[i]);
  
      //Padding "0" in front of the Binary number to make it 8-bit and pushing it into the list.
      binList.push(bitPadding(b.toString()));
    }
  
    return binList;
  }
  
  //Passing each character of the string to the ASCII Object to get it's corresponding Decimal number
  function getAsciiList(str, asciiObj) {
    var lst = [];
    for(var i in str) {
      lst.push(asciiObj[str[i]]);
    }
    return lst;
  }
  
  //A Recursive method to convert the number to Binary
  function getBinary(n) {
    if(n === 0)
        return 0;
    else
    {
        var r = n%2;
        var q = getBinary(Math.floor(n/2));
        return (10*q)+r;
    }
  }
  
  //For Padding, I am terating the Binary number from right to left and adding it to a list, once the binary number is added, I have added 0 to the remaining places of the list. Finally I am using .join() method to convert the list to a string.
  function bitPadding(binaryStr) {
    var lst = []
    var len = binaryStr.length;
    for(i=7; i>=0; i--) {
        if(len-1 >= 0)
        {
            lst[i] = binaryStr[len-1];
            len--;
        }
        else
            lst[i] = "0";
    }
    
    return lst.join("");
  }