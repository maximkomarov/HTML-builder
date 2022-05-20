const fs = require('fs');
const path = require('path');


function copyDir(){
    fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (err) => {
        if(err){
            console.log('failed to create folder');
        }
        fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, files) => {
            if (err) throw err;
            let filesArray = files.filter(element => element.isFile());
            let fileNames = [];
            filesArray.forEach(element => fileNames.push(element.name));
            fileNames.forEach(element => fs.copyFile(path.join(__dirname, 'files', element), path.join(__dirname, 'files-copy', element),(err) => {
                if(err){
                    console.log('failed to copy files')
                }
            }))
          });
    })
}


fs.rm(path.join(__dirname, 'files-copy'), {recursive: true, force:true}, () => {copyDir();});

