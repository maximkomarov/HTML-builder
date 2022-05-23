const fs = require('fs');
const path = require('path');
let templateData = '';
let dataParsed = [];



fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
    if(err){
        console.log('failed to create folder');
    }
    fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
    fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, files) => {
        if (err) throw err;
        let components = files.filter(element => element.isFile() && element.name.split('.')[1] == 'html');
        getData(components);
      });
    
})

function getData(components){
    let length = components.length;
    for(let i = 0; i < length; i++){
        dataParsed.push('');
    }

    const streamTemplate = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
    streamTemplate.on('data', chunk => templateData += chunk.trim());
    streamTemplate.on('end', () => 
    {
    for (let i = 0; i < length; i++){
        const stream = fs.createReadStream(path.join(__dirname, 'components', `${components[i].name}`), 'utf-8');
        stream.on('data', chunk => dataParsed[i] += chunk.trim());
        stream.on('end', () => {
            templateData = templateData.replace(`{{${components[i].name.split('.')[0]}}}`, dataParsed[i]);
            if(i == length - 1)
            createIndexHtml();
        });        
    }
});
}


function createIndexHtml(){
    fs.appendFile(
        path.join(__dirname, 'project-dist', 'index.html'),
        templateData,
        err => {
            if (err) throw err;
        }
    );
}


fs.rm(path.join(__dirname, 'project-dist', 'style.css'), {recursive: true, force:true}, () => {createBundle();});


function createBundle(){
    
fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    let filesArray = files.filter(element => element.isFile() && element.name.split('.')[1] == 'css');
    filesArray.forEach(element => readFile(element.name));
  });
}

  function readFile (fileName){
    let cssData = '';
    let pathToFile = path.join(__dirname, 'styles', fileName);
    const stream = fs.createReadStream(pathToFile, 'utf-8');
    stream.on('data', chunk => cssData += chunk);
    stream.on('end', () => {fs.appendFile(
        path.join(__dirname, 'project-dist', 'style.css'),
        cssData + '\r\n\r\n',
        err => {
            if (err) throw err;
        }
    )});
  }


  function copyDir(){
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, (err) => {
        if(err){
            console.log('failed to create folder');
        }
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), {recursive: true}, (err) => {
            if(err){
                console.log('failed to create folder');
            }
        })
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), {recursive: true}, (err) => {
            if(err){
                console.log('failed to create folder');
            }
        })

        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), {recursive: true}, (err) => {
            if(err){
                console.log('failed to create folder');
            }
        })
  
        fs.readdir(path.join(__dirname, 'assets', 'fonts'), {withFileTypes: true}, (err, files) => {
            if (err) throw err;
            let filesArray = files.filter(element => element.isFile());
            let fileNames = [];
            filesArray.forEach(element => fileNames.push(element.name));
            fileNames.forEach(element => fs.copyFile(path.join(__dirname, 'assets', 'fonts', element), path.join(__dirname, 'project-dist', 'assets', 'fonts', element),(err) => {
                if(err){
                    console.log('failed to copy files')
                }
            }))
          
            fs.readdir(path.join(__dirname, 'assets', 'img'), {withFileTypes: true}, (err, files) => {
                if (err) throw err;
                let filesArray = files.filter(element => element.isFile());
                let fileNames = [];
                filesArray.forEach(element => fileNames.push(element.name));
                fileNames.forEach(element => fs.copyFile(path.join(__dirname, 'assets', 'img', element), path.join(__dirname, 'project-dist', 'assets', 'img', element),(err) => {
                    if(err){
                        console.log('failed to copy files')
                    }
                }))
              
                fs.readdir(path.join(__dirname, 'assets', 'svg'), {withFileTypes: true}, (err, files) => {
                    if (err) throw err;
                    let filesArray = files.filter(element => element.isFile());
                    let fileNames = [];
                    filesArray.forEach(element => fileNames.push(element.name));
                    fileNames.forEach(element => fs.copyFile(path.join(__dirname, 'assets', 'svg', element), path.join(__dirname, 'project-dist', 'assets', 'svg', element),(err) => {
                        if(err){
                            console.log(err);
                            console.log('failed to copy files')
                        }
                    }))
                  });
            
            
            
            
            });
        
        
        
        
        });
    
    })
}


fs.rm(path.join(__dirname, 'project-dist', 'assets'), {recursive: true, force:true}, () => {copyDir();});