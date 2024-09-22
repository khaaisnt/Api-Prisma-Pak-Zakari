import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
import path from "path";
import fs from "fs";
import { ROOT_DIRECTORY } from "../config";
import bcrypt from "bcrypt"

const prisma = new PrismaClient({errorFormat:"minimal"})

/** schema create */
const createAdmin = async (
    req: Request,
    res: Response,
) => {
    try{
        const username: string = req.body.username
        const email: string = req.body.email
        const password: string = req.body.password
        
        const newAdmin = await prisma.admin.create({
            data: {
                username,
                email,
                password 
            }
        });

        return res.status(200).json({
            message: "new admin has been created",
            data: newAdmin
        })
    }catch(err){
        console.log(err);

        return res.status(500).json({ error: err })
    }
}

const readAdmin = async (
    req: Request,
    res: Response,
) => {
    try {
        const search = req.query.search
        const allAdmin = await prisma.admin.findMany({
            where: {
                OR: [
                    {username: {contains: search?.toString() || ""}},                                     
               ]
            }
        })
        return res.status(200).json({
            message: `admin has been retri`,
            data: allAdmin
        })
    }catch(err){
        console.log(err)
        res.status(500).json({ error: err })
    }
}

const updateAdmin = async (
    req: Request,
    res: Response,
) => {
    try{
        const id = req.params.id

        const findAdmin = await prisma.admin.findFirst({
            where: {id: Number(id)}
        })

        if(!findAdmin) {
            return res.status(200).json ({
                message: `admin not found`
            })
        }

        const {username,email,password} = req.body

        const saveAdmin = await prisma.admin.update({
            where: {id: Number(id)},
            data: {
                username: username ?? findAdmin.username,
                email: email ?? findAdmin.email,
                password: password ?? findAdmin.password
            }
        })
        
        return res.status(200).json({
            message: `Admin has been updated`,
            data: saveAdmin
        })
    }catch(err){
        return res.status(500).json({ error: err })
    }
}

const deleteAdmin = async (
    req: Request,
    res: Response
) => {
    try{
        const id = req.params.id

        const findAdmin = await prisma.admin.findFirst({
            where: {
                id: Number(id)
            }
        })

        if(!findAdmin) {
            return res.status(200).json({message: `admin is not found`})
        }

        const saveAdmin = await prisma.admin.delete({
            where: {id: Number(id)}
        })

        return res.status(200).json ({
            message: `admin has been removed`,
            data: saveAdmin
        })
    }catch(err){
        return res.status(500).json({
            error: err
        })
    }
}

export { createAdmin, readAdmin, updateAdmin, deleteAdmin }