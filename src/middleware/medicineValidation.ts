import exp from "constants"
import { Request, Response, NextFunction} from "express"
import Joi from "joi"
import path from "path"
import { ROOT_DIRECTORY } from "../config"
import fs from "fs"

/** create rule/schema */

const createScheme = Joi.object({
    name: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    exp_date: Joi.date().required(),
    price: Joi.number().min(1).required(),
    type: Joi.string().valid("Syrup", "tablet", "powder").required()
})

const createValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = createScheme.validate(req.body)
    if (validate.error) {
        /** delete current up file */
        let fileName: string = req.file?.filename||``
        let pathFile = path.join(ROOT_DIRECTORY, "public", "medicine-photo" ,fileName)

        /** check is file extension  */
        let fileExist = fs.existsSync(pathFile)

        if(fileExist && fileName !== ``){
            /** delete file */
            fs.unlinkSync(pathFile)
        }
        return res.status(400).json({
            message: validate
            .error
            .details
            .map(item => item.message)
            .join()
        })
    }

    return next()
}

const updateScheme = Joi.object({
    name: Joi.string().optional(),
    stock: Joi.number().min(0).optional(),
    exp_date: Joi.date().optional(),
    price: Joi.number().min(1).optional(),
    type: Joi.string().valid("Syrup", "tablet", "powder").optional()
})

const updateValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = updateScheme.validate(req.body)
    if (validate.error) {
         /** delete current up file */
         let fileName: string = req.file?.filename||``
         let pathFile = path.join(ROOT_DIRECTORY, "public", "medicine-photo" ,fileName)
 
         /** check is file extension  */
         let fileExist = fs.existsSync(pathFile)
 
         if(fileExist && fileName !== ``){
             /** delete file */
             fs.unlinkSync(pathFile)
         }
        return res.status(400).json({
            message: validate
            .error
            .details
            .map(item => item.message).join()
        })
    }

    return next()
}

const deleteScheme = Joi.object({
    name: Joi.string().optional(),
    stock: Joi.number().min(0).optional(),
    exp_date: Joi.date().optional(),
    price: Joi.number().min(1).optional(),
    type: Joi.string().valid("Syrup", "tablet", "powder").optional()
})

const deleteValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = deleteScheme.validate(req.body)
    if (validate.error) {
         /** delete current up file */
         let fileName: string = req.file?.filename||``
         let pathFile = path.join(ROOT_DIRECTORY, "public", "medicine-photo" ,fileName)
 
         /** check is file extension  */
         let fileExist = fs.existsSync(pathFile)
 
         if(fileExist && fileName !== ``){
             /** delete file */
             fs.unlinkSync(pathFile)
         }
        return res.status(400).json({
            message: validate
            .error
            .details
            .map(item => item.message).join()
        })
    }

    return next()
}

export { createValidation, updateValidation,deleteValidation }