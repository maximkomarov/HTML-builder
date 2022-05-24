const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
console.log('Введите текст...');

stdin.on('data', data => writeData(data.toString()));


function writeData(data){
    if(data.trim() === 'exit'){
        console.log('До свидания');
        process.exit();
    }
    fs.appendFile(
        path.join(__dirname, 'text.txt'),
        data,
        err => {
            if (err) throw err;
            console.log('Введите текст...');
        }
    );
}

process.on("SIGINT", () => {console.log('До свидания'); process.exit()});

