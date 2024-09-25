import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // read token from header
        const header = req.headers.authorization
        const [type, token] = header ? header.split(" ") : []

        // verivy token
        const signature = process.env.SECRET || ""
        const isVerified = jwt.verify(token, signature)
        if(!isVerified) {
            return res.status(401)
            .json({
                message: `Unauthorized`
            })
        }
        next()
    } catch (error) {
        return res.status(401)
        .json({
            message: error
        })
        
    }
}

export { verifyToken }