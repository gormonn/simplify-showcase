const fs = require('fs')
const Path = require('path')
const {
    POS_DATA,
    POS_OUTPUT,
    SM_DATA,
    SM_OUTPUT
} = require('./const')

function clearDir(dirPath, removeSelf = false){
    if (removeSelf === undefined)
      removeSelf = true;
    try { var files = fs.readdirSync(dirPath); }
    catch(e) { return; }
    if (files.length > 0)
      for (var i = 0; i < files.length; i++) {
        var filePath = dirPath + '/' + files[i];
        if (fs.statSync(filePath).isFile())
          fs.unlinkSync(filePath);
        else
          rmDir(filePath);
      }
    if (removeSelf)
      fs.rmdirSync(dirPath);
}

clearDir(POS_OUTPUT)
clearDir(SM_DATA + '/images')
clearDir(SM_DATA + '/keypoints')
clearDir(SM_OUTPUT + '/meshes')
clearDir(SM_OUTPUT + '/results')