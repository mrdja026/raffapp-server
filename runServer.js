fs = require('fs');
var argument = process.argv.slice(2);
console.log('arguments', process.argv);
var fileToGenerate = argument == 'DEV' ? './keys-dev.js' : './keys-prod.js';
console.log('KEYS', fileToGenerate);
try {
    fs.createReadStream(fileToGenerate).pipe(fs.createWriteStream('keys.js'));
} catch (error) {
    console.error('Postinstal script failed' + error);
}