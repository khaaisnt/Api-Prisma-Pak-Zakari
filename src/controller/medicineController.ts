import { Request, Response } from "express";
import { PrismaClient, DrugType } from "@prisma/client";
import { error, log } from "console";
import { date } from "joi";

/** create object of prisma */
const prisma = new PrismaClient({errorFormat:"minimal"});

const createMedicine = async (req: Request, res: Response) => {
    try {
        const name: string = req.body.name;
        const stock: number = Number(req.body.stock);
        const exp_date: Date = new Date(req.body.exp_date);
        const price: number = Number(req.body.price);
        const type: DrugType = req.body.type;

        //** SAVE A NEW MEDICINE TO DB */
        const newMedicine = await prisma.medicine.create({
            data: { 
                name,
                stock,
                exp_date,
                price,
                type
            }
        });
        
        return res.status(200).json({
            message: "new medicine has been created",
            data: newMedicine
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ error: error });
    }
}

const readMedicine = async (
    req: Request,
    res: Response
) => {
    try {
       const allMedicine = await prisma.medicine.findMany()
       return res.status(200).json({
        message: `medicine has been retri`,
        data: allMedicine
       })
    } catch (error){
        res.status(500).json(error)
    }
}

const UpdateMedicine = async (req: Request, res: Response) => {
    try{
        /** read id medicine that sent at parameter url */
        const id = req.params.id

        /** check existing medicine based on id */
        const findMedicine = await prisma.medicine
        .findFirst({
            where: {id: Number(id)}
        })

        if(!findMedicine) {
            return res.status(200).json ({
                message: `medicine is not found`
            })
        }

        /** read a property of medicine from req.body */
        const {name, stock, price, type, exp_date} = req.body

        /** update medicine */
        const saveMedicine = await prisma.medicine.update({
            where: {id: Number(id)},
            data: {
                name: name ?? findMedicine.name,
                stock: stock ? Number(stock) : findMedicine.stock,
                price: price ? Number(price) : findMedicine.price,
                exp_date: exp_date? new Date (exp_date) : findMedicine.exp_date,
                type: type ? type : findMedicine.type
            }
        })

        return res.status(200)
        .json({
            message: `medicine has been updated`,
            data: saveMedicine
        })
    }catch(error){
        return res.status(500).json(error)
    }   
}

const deleteMedicine = async (req: Request, res: Response) => {
    try{
        const id = req.params.id

        /** check existing medicine */
        const findMedicine = await prisma.medicine.findFirst
        ({where: {
            id: Number(id)
        }})

        if(!findMedicine) {
            return res.status(200)
            .json({message: `medicine is not found`})
        } 

        /** delete medicine  */
        const saveMedicine = await prisma.medicine.delete({
            where: {id: Number(id)}
        })

        return res.status(200).json ({
            message: `medicine has been removed`,
            data: saveMedicine
        })
    }catch(error){
        return res.status(500).json(error)
    }
}

export { createMedicine, readMedicine, UpdateMedicine, deleteMedicine };

