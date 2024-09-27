import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient({errorFormat: `minimal`});

type TransactionDetail = {
    medicine_id: number,
    qty: number
}

const createTransaction = async (req: Request, res: Response) => {
    try {
        // read a request data
        const cashier_name: string = req.body.chasier_name
        const order_date: Date = req.body.order_date
        const transaction_detail: TransactionDetail[] = req.body.transaction_detail

        // checking medicine (memastikan id obat tersedia)
        const arrayMedicineId = transaction_detail.map(item => item.medicine_id)
        // check medicine id at medicine table
        const findMedicine = await prisma.medicine.findMany({
            where: {id: {in: arrayMedicineId}}
        })
        // check id obat yang tidak tersedia
        const notFoundMedicine = arrayMedicineId.filter(
            item => !findMedicine.map(
                obat => obat.id
            ).includes(
                item
            )
        )

        if(notFoundMedicine.length > 0){
            return res.status(400).json({
                message: `There are medicine that doesn't exist`
            })
        }

        // save transaction data
        const newTransaction = await prisma.transaction.create({
            data: {
                cashier_name,
                order_date,
            }
        })
        // prepare data for transaction detail
        let newDetail: any[] = []
        for (let i = 0; i < transaction_detail.length; i++){
            const {medicine_id, qty} = transaction_detail[i]
            // find price at each medicine
            const medicineItem = findMedicine.find(item => item.id === medicine_id)

            newDetail.push({
                transsantion_id: newTransaction.id,
                medicine_id,
                qty,
                order_price: medicineItem?.price || 0
            })
        }

        // save transaction detail
        await prisma.transaction_detail.createMany({
            data: newDetail
        })

        return res.status(200).json({
            message: `New transaction has been created`
        })

    } catch (error) {
        return res.status(500).json(error)
    }
}

export { createTransaction }