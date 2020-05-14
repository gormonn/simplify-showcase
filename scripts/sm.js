const {
    SM_DATA,
    SM_OUTPUT
} = require('../const')

const SMPL_PATH = '/home/dimon/smplify-x/'
const SM = [
    `${SMPL_PATH}smplifyx/main.py`,
    `--config`, `${SMPL_PATH}cfg_files/fit_smplx.yaml`,
    `--data_folder`, `${SM_DATA}`,
    `--output_folder`, `${SM_OUTPUT}`,
    `--visualize="False"`,
    `--model_folder`, `${SMPL_PATH}FOLDERS/MODEL`,
    `--vposer_ckpt`, `${SMPL_PATH}FOLDERS/VPOSER`,
    `--part_segm_fn`, `${SMPL_PATH}FOLDERS/smplx_parts_segm.pkl`,
    `--interpenetration="False"`,
    // фокусное расстояние (мм) - необходимо для корректного построения позы
    `--focal_length=2000`,
    `--gender=male`
]

module.exports = {SM}