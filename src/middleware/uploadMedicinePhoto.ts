import multer from "multer";
import { Request } from "express";
import { ROOT_DIRECTORY } from "../config";

/**define storage to save uploaded file */
const storage = multer.diskStorage({
    destination:(
    req:Request,
    file:Express.Multer.File,
    callback:(error:Error | null, destination:string)=> void
) => {
    const storagePath = `${ROOT_DIRECTORY}/public/medicine-photo/`
    callback(null, storagePath)
 }, 
 filename:(
    req:Request,
    file:Express.Multer.File,
    callback:(error:Error | null, filename:string)=> void
) => {
    const filename = `${Math.random()}-${file.originalname}`
    callback(null, filename)
 }
})  

/** define function to filtering file */
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
) => {
    /** define allowed extenstion */
    const allowedFile = /png|jpg|jpeg|gif/
    /** check extenstion of uploaded file */
    const isAllow = allowedFile.test(file.mimetype)
    if (isAllow) {
        callback(null, true)
    }else {
        callback(new Error(`file mu eror`))
    }
}

const uploadMedicinePhoto = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 2 * 1024 * 1024} // 2mb
})

export { uploadMedicinePhoto }