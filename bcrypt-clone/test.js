const bcryptClone = require('./bcryptClone');
const readLineSync = require('readline-sync');

const main = async () => {
    try {
        const str = readLineSync.question("Enter any string: ");
        const hashedStr = await bcryptClone.hash(str, 12);
        console.log("Generated Hashed String: " + hashedStr);
        
        const str2 = readLineSync.question("Enter the string again: ");
        const res = await bcryptClone.compare(str2, hashedStr);
        if(res)
            console.log("String Are The SAME!");
        else
            console.log("String MISMATCH");
    }
    catch(err) {
        console.log(err);
    }
}

main();