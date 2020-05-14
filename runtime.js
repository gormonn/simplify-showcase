const express = require('express')
const {spawn} = require('child_process')
const app = express()
const port = 3000
const {
    POS_DATA,
    POS_OUTPUT,
    SM_DATA,
    SM_OUTPUT
} = require('./const')

const SMPL_PATH = '/home/dimon/smplify-x/'
const SMPL = [
    `${SMPL_PATH}smplifyx/main.py`,
    `--config`, `${SMPL_PATH}cfg_files/fit_smplx.yaml`,
    `--data_folder`, `${SMPL_PATH}FOLDERS/DATA`,
    `--output_folder`, `${SMPL_PATH}FOLDERS/OUTPUT`,`--visualize="False"`,
    `--model_folder`, `${SMPL_PATH}FOLDERS/MODEL`,
    `--vposer_ckpt`, `${SMPL_PATH}FOLDERS/VPOSER`,
    `--part_segm_fn`, `${SMPL_PATH}FOLDERS/smplx_parts_segm.pkl`,
    `--interpenetration="False"`
]

const SM = [
    `${SMPL_PATH}smplifyx/main.py`,
    `--config`, `${SMPL_PATH}cfg_files/fit_smplx.yaml`,
    `--data_folder`, `${SM_DATA}`,
    `--output_folder`, `${SM_OUTPUT}`,
    `--visualize="True"`,
    `--model_folder`, `${SMPL_PATH}FOLDERS/MODEL`,
    `--vposer_ckpt`, `${SMPL_PATH}FOLDERS/VPOSER`,
    `--part_segm_fn`, `${SMPL_PATH}FOLDERS/smplx_parts_segm.pkl`,
    `--interpenetration="False"`
]
function stdOnData(data) {
    console.log(`SM: ${data.toString()}`)
}

const python = spawn('python', SM)
python.stdout.on('data', stdOnData)
python.on('close', (code) => {
    console.log('SM: END-OF-STREAM')
})
python.stderr.on('data', (data) => {
    console.log('SM: ' + data)
})

// const Handler = (code) => console.log(`child process error ${code}`)

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })

// const write = (res, str) => {
//     res.write('data: ' + str ? str : '' + "\n\n")
//     // console.log(str)
// }

// app.get('/EventSource', (req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive'
//     })

//     write(res, 'Start SMPL')
//     // console.log(SMPL)
//     let dataToSend, str
//     // spawn new child process to call the python script
//     const python = spawn('python', SMPL);

//     python.stdout.on('data', function (data) {
//         str += data.toString();

//         // just so we can see the server is doing something
//         // Flush out line by line.
//         var lines = str.split("\n");
//         for(var i in lines) {
//             if(i == lines.length - 1) {
//                 str = lines[i];
//             } else{
//                 // Note: The double-newline is *required*
//                 write(res, lines[i]);
//             }
//         }
//     });

//     python.on('close', (code) => {
//         // res.end('data: '+str)
//         res.end('data: END-OF-STREAM')
//     })

//     python.stderr.on('data', (data) => {
//         write(res, data)
//         // res.end('stderr: ' + data)
//     })
// })

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))