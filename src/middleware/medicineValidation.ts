import exp from "constants"
import { Request, Response, NextFunction} from "express"
import Joi from "joi"

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
        return res.status(400).json({
            message: validate
            .error
            .details
            .map(item => item.message).join()
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