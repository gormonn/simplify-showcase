const fs = require('fs')
const {spawn} = require('child_process')
const { OPENPOSE, OPENPOSE_CONFIG } = require('./openpose')
const {
    POS_DATA,
    POS_OUTPUT,
    SM_DATA,
    SM_OUTPUT
} = require('../const')

const EMPTY_FN = () => {}

function copy(from, to, cb = EMPTY_FN){
    fs.copyFile(from, to, (err) => {
        if (err) throw err
        console.log([
            from,
            'was copied to',
            to
        ])
        cb()
    })
}

// работает только с 1 файлом!
function move(fromDir, toDir, cb = EMPTY_FN){
    const files = fs.readdirSync(fromDir)
    const from = fromDir + '/' + files[0] // files[0] - might be error
    const to = toDir + '/' + files[0]
    if (fs.statSync(from).isFile()){
        fs.rename(from, to, (err) => {
            if (err) throw err
            console.log('Rename complete!')
            cb()
        })
    }else{
        throw err
    }
}

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
        clearDir(filePath);
      }
    if (removeSelf)
      fs.rmdirSync(dirPath);
}

const LOGGER_DEBUG = true
class SpawnLogger{
    constructor(command, args, name = command){
        if(LOGGER_DEBUG) console.log(command, args)
        this.process = spawn(command, args)
        this.process.stdout.on('data', (data) => 
            console.log(`${name}: ${data.toString()}`))

        this.process.on('close', (code) => 
            console.log(`${name}: END-OF-STREAM`))

        this.process.stderr.on('data', (data) =>
            console.log(`${name}: ${data.toString()}`))
    }
}

// const openpose = new SpawnLogger('docker', OPENPOSE, 'OPENPOSE')

// // openpose.stdout.on('data', stdOnData)
// // openpose.on('close', (code) => {
// //     console.log('OPENPOSE: END-OF-STREAM')
// // })
// // openpose.stderr.on('data', (data) => {
// //     console.log(`OPENPOSE: ${data}`)

module.exports = {copy, move, SpawnLogger, clearDir}