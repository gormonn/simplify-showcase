const chokidar = require('chokidar')
const {spawn} = require('child_process')
const fs = require('fs')
const Path = require('path')
const {
    POS_DATA,
    POS_OUTPUT,
    POS_BACKLOG,
    SM_DATA,
    SM_OUTPUT
} = require('./const')
const { copy, move, SpawnLogger, clearDir } = require('./scripts/utils')
const { OPENPOSE, OPENPOSE_CONFIG } = require('./scripts/openpose')
const { SM } = require('./scripts/sm')

const smInputStateDefault = -1
let smInputState = smInputStateDefault

chokidar.watch(POS_DATA, { awaitWriteFinish: true }).on('all', (event, path) => {
    console.log(event, path)
    switch(event){
        case 'add':
        case 'change':
            // if(OPENPOSE_CONFIG.triD){

            // }
            // start OPENPOSE
            new SpawnLogger('docker', OPENPOSE, 'OPENPOSE')
        break
    }
})

chokidar.watch(POS_OUTPUT, { awaitWriteFinish: true }).on('all', (event, path) => {
    console.log(event, path)
    switch(event){
        case 'add':
        // case 'change':
            console.log('rename and copy to SM_DATA')

            const fileName = Path.basename(path)
            const ext = Path.extname(fileName)
            let destination
            if(fileName.indexOf('_keypoints') > -1){
                //keypoints
                const baseName = fileName.split('_keypoints')[0]
                const newName = `${baseName}_rendered_keypoints${ext}`
                destination = `${SM_DATA}/keypoints/${newName}`
            }else if(fileName.indexOf('_rendered')){
                //img
                destination = `${SM_DATA}/images/${fileName}`
            }else{
                console.error('file error', fileName)
                return
            }

            // rename and copy to SM_DATA
            copy(path, destination)
        break
    }
})


chokidar.watch(SM_DATA, { awaitWriteFinish: true }).on('all', (event, path) => {
    console.log(event, path)
    switch(event){
        case 'add':
            smInputState++
            console.log({smInputState})
            if(smInputState){
                clearDir('sm/lastmesh')
                new SpawnLogger('python', SM, 'SM')
            }
        break
    }
})

chokidar.watch(SM_OUTPUT, { awaitWriteFinish: true }).on('all', (event, path) => {
    console.log(event, path)
    switch(event){
        case 'add':
            const fileName = Path.basename(path)
            const ext = Path.extname(fileName)
            if(ext === '.obj'){
                copy(path, 'sm/lastmesh/000.obj', () => {
                    console.log('open model view')
                    new SpawnLogger('python', ['objViewer.py'], 'objViewer')
                    clear()
                })
            }
        break
    }
})

function clear(){
    if(smInputState){
        clearDir(POS_OUTPUT)
        clearDir(SM_DATA + '/images')
        clearDir(SM_DATA + '/keypoints')
        clearDir(SM_OUTPUT + '/meshes')
        clearDir(SM_OUTPUT + '/results')
        smInputState = smInputStateDefault

        // move input to trash folder
        move(POS_DATA, POS_BACKLOG)
        // clearDir(SM_DATA)
    }
}

// chokidar.watch('sm/lastmesh/', { awaitWriteFinish: true }).on('all', (event, path) => {
//     console.log(event, path)
//     switch(event){
//         case 'add':
//             console.log('open model view')
//             new SpawnLogger('python', ['objViewer.py'], 'objViewer')
//             // const objViewer = spawn('python', ['objViewer.py']);

//             // objViewer.stdout.on('data', smStdOnData)
//             // objViewer.on('close', (code) => {
//             //     console.log('SM: END-OF-STREAM')
//             // })
//             // objViewer.stderr.on('data', (data) => {
//             //     console.log(`SM: ${data}`)
//             // })

//             //clear data
//             if(smInputState){
//                 clearDir(POS_OUTPUT)
//                 clearDir(SM_DATA + '/images')
//                 clearDir(SM_DATA + '/keypoints')
//                 clearDir(SM_OUTPUT + '/meshes')
//                 clearDir(SM_OUTPUT + '/results')
//                 smInputState = smInputStateDefault
//                 // clearDir(SM_DATA)
//             }
//         break
//     }
// })
