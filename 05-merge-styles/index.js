const fs = require('fs');
const path = require('path');




fs.rm(path.join(__dirname, 'project-dist', 'bundle.css'), {recursive: true, force:true}, () => {createBundle();});


function createBundle(){
    
fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    let filesArray = files.filter(element => element.isFile() && element.name.split('.')[1] == 'css');
    filesArray.forEach(element => readFile(element.name));
    //filesArray.forEach(element => console.log(element));
    // fileNames.forEach(element => fs.copyFile(path.join(__dirname, 'files', element), path.join(__dirname, 'files-copy', element),(err) => {
    //     if(err){
    //         console.log('failed to copy files')
    //     }
    // }))
  });
}

  function readFile (fileName){
    let cssData = '';
    let pathToFile = path.join(__dirname, 'styles', fileName);
    const stream = fs.createReadStream(pathToFile, 'utf-8');
    stream.on('data', chunk => cssData += chunk);
    stream.on('end', () => {fs.appendFile(
        path.join(__dirname, 'project-dist', 'bundle.css'),
        cssData,
        err => {
            if (err) throw err;
            //console.log('Записано в бандл');
        }
    )});
  }