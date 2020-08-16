/*
Write a program which takes two numbers as input but as a string,
and return the sum of those two numbers.
*/

function addVeryLargeNumbers(num1, num2) {
    
    var len1 = num1.length;
    var len2 = num2.length;

    //Swap the strings if the lenght of 2nd string is greater than the length of 1st
    if(len2 > len1) {
        [num1, num2] = [num2, num1];
    }
    var sum = '';
    
    var carry = 0;
    
    //Reverse both the strings (just for the easy of iterating through the loop)
    num1 = reverseString(num1);
    num2 = reverseString(num2);

    //Add the numbers at each index of the string one by one till the size of smaller string
    for(var i=0; i<len2; i++) {
        var s = parseInt(num1[i]) + parseInt(num2[i]) + carry;
        carry = Math.floor(s/10);
        sum += (s%10);
    }
    
    //Add the remaining numbers
    for(i=len2; i<len1; i++) {
        var s = parseInt(num1[i]) + carry;
        carry = Math.floor(s/10);
        sum += (s%10);
    }
    
    //If the carry still remains, then just add the carry to the sum
    if(carry > 0)
        sum += carry;
    
    //Since we reversed the strings before adding, we need to reverse it back to get the correct sum
    return reverseString(sum);
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

//Test Cases!!
console.log(addVeryLargeNumbers("900","345"));
console.log(addVeryLargeNumbers("5987342879234789234897", "23489072349807239487"));