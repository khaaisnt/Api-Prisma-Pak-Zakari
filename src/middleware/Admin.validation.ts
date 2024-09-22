import { Request, Response, NextFunction } from "express";
import Joi, { valid } from "joi";
import path from "path";
import { ROOT_DIRECTORY } from "../config";
import fs from "fs";

/** create */

const CreateAdmin = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})

const createValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = CreateAdmin.validate(req.body)
    if (validate.error) {
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

const UpdateAdmin = Joi.object({
    username: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().optional()
})

const updateValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = UpdateAdmin.validate(req.body)
    if (validate.error) {
        return res.status(400).json({
            message: validate
            .error
            .details
            .map(item => item.message).join()
        })
    }
    return next()
}

const DeleteAdmin = Joi.object({
    username: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().optional()
})

const deleteValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = DeleteAdmin.validate(req.body)
    if (validate.error) {
        return res.status(400).json({
            message: validate
            .error
            .details
            .map( item=> item.message ).join()
        })
    }
    return next()
}

export {createValidation, updateValidation, deleteValidation}