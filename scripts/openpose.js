const { POS_ROOT } = require('../const')

const cfg = {
    triD: false
}
function If(prop, val){
    return prop ? val : ''
}
function TD(val){
    return If(cfg.triD, val)
}

const OPENPOSE_CONTAINER_SIDE_FOLDER = 'data'
const OPENPOSE = [
    // `sudo`, `docker`,
    `run`,
    `-v`, `${POS_ROOT}:/openpose/${OPENPOSE_CONTAINER_SIDE_FOLDER}/`,
    `--runtime=nvidia`, `exsidius/openpose`,
    
    `./build/examples/openpose/openpose.bin`,
    `--image_dir`, `./${OPENPOSE_CONTAINER_SIDE_FOLDER}/input`,
    `--display`, `0`,
    `--write_json`, `./${OPENPOSE_CONTAINER_SIDE_FOLDER}/output`,
    `--write_images`, `./${OPENPOSE_CONTAINER_SIDE_FOLDER}/output`,
    `--face`,
    `--hand`,
    // `--hand_scale_number`, `6`,
    // `--hand_scale_range`, `0.4`,
    `--model_pose`, `BODY_25`,
    // для триангуляции
    // TD(`--3d`),
    // TD(`--number_people_max`), TD(`1`)
    // количество камер
    // `--3d_views`, `3`
]

module.exports = {OPENPOSE, OPENPOSE_CONFIG: cfg}

// const POS_DOCKER = [
//     `sudo`,
//     `docker`,
//     `run`,
//     `-it`,
//     `-v`, `${OPENPOSE_ROOT}:/openpose/data/`,
//     `--net=host`,
//     `-e`, `DISPLAY`,
//     `--runtime=nvidia`, `exsidius/openpose`
// ]
// const POS = [
//     `./build/examples/openpose/openpose.bin`,
//     `--image_dir`, `./data/input`,
//     `--display`, `0`,
//     `--write_json`, `./data/output`,
//     `--write_images`, `./data/output`,
//     `--face`,
//     `--hand`
// ]

/*

sudo docker run -it -v /home/dimon/openposedata/:/openpose/data/ --net=host -e DISPLAY --runtime=nvidia exsidius/openpose

./build/examples/openpose/openpose.bin --image_dir ./data --display 0 --write_json ./data/result --write_images ./data/result --face --hand

sudo docker run -v /home/dimon/openposedata/:/openpose/data/ --runtime=nvidia exsidius/openpose ./build/examples/openpose/openpose.bin --image_dir ./data --display 0 --write_json ./data/result --write_images ./data/result --face --hand


*/