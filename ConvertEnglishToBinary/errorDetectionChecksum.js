module.exports.findChecksum = function (data) {
    sum = data[0];
    for(var i=1; i<data.length; i++) {
        sum = binaryAdd(sum,data[i]);
    }
    sum = onesComplement(sum);
    return sum;
}

function binaryAdd(num1, num2) {
    var sum = '';
    var s = 0;

    var i = num1.length - 1;
    var j = num2.length - 1;
    while(i >= 0 || j >= 0 || s == 1) {

        s += ((i>=0) ? num1[i] - '0' : 0);
        s += ((j>=0) ? num2[j] - '0' : 0);

        sum = (s%2) + sum;
        s = Math.floor(s/2);

        i--;
        j--;
    }

    return sum;
}

function onesComplement(binary) {
    var len = binary.length;
    var ones = '';
    for(var i=0; i<len; i++) {
        ones += (binary[i] === '0') ? '1' : '0';
    }
    return ones;
}