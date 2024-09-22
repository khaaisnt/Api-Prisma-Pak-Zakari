/** define address / path of root folder */
import path from "path"
const ROOT_DIRECTORY = `${path.join(__dirname, `../`)}`
/** __dirname: mendaptkan posisi dari folder  */
/** pada file ini (config.ts). -> /src/config.ts */
/** ../ artinya mundur satu folder ke belakang */ 

export { ROOT_DIRECTORY }
