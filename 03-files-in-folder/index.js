const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    let filesArray = files.filter(element => element.isFile());
    filesArray.forEach(element => output(element.name));
  });

 

function output(fileName){    
    const ext = path.extname(fileName);
    const name = fileName.replace(ext, '');
    fs.stat(path.join(__dirname, 'secret-folder', fileName), (err, stats) => {
        console.log(name + ' - ' + ext.replace('.', '') + ' - ' + stats.size + 'b');
      });    
}