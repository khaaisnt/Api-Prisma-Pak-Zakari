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
        const cashier_name: string = req.body.cashier_name;
        const order_date: Date = new Date (req.body.order_date)
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
                transaction_id: newTransaction.id,
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
        console.log(error)
    }
}

const readTransaction = async (req: Request, res: Response) => {
    try {
        // Get filter parameters from query
        const { cashier_name, start_date, end_date } = req.query;

        // Build the filter object
        let filter: any = {};

        if (cashier_name) {
            filter.cashier_name = cashier_name;
        }

        if (start_date || end_date) {
            filter.order_date = {};
            if (start_date) {
                filter.order_date.gte = new Date(start_date as string);
            }
            if (end_date) {
                filter.order_date.lte = new Date(end_date as string);
            }
        }

        /**
         * mendapatkan seluruh data transaksi
         * sekaligus detail di tiap transaksinya
         */
        let allTransaction = await prisma.transaction.findMany({
            where: filter,
            include: {
                transaction_detail: {
                    include: { medicine_details: true }
                }
            }
        });

        // menentukan total harga di setiap transaksi
        allTransaction = allTransaction.map(trans => {
            let total = trans.transaction_detail.reduce((jumlah, detail) => jumlah + (detail.order_price * detail.qty), 0);
            return {
                ...trans, total
            };
        });

        return res.status(200).json({
            message: `All transaction has been retrieved`,
            data: allTransaction
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}

const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const findTransaction = await prisma.transaction.findFirst({
            where: {id: Number(id)}
        })

        if(!findTransaction){
            return res.status(400)
            .json({
                message: `Transaction is not found`
            })
        }

        // hapus detail transaksi
        // detail transaksi adalah table yang tergantung pada table transaksi
        await prisma.transaction_detail.deleteMany({
            where: {transaction_id: Number(id)}
        })

        await prisma.transaction
            .delete({where: {id: Number(id)}})

        return res.status(200)
            .json({
                message: `Transaction has been deleted`
            })

    } catch (error) {
        return res.status(500)
        .json(error)
    }
}

const updateTransaction = async (req: Request, res: Response) => {
    try {
        // read id transaction from req params
        const {id} = req.params
        
        // check that transaction is exist
        const findTransaction = await prisma.transaction.findFirst({
            where: {id: Number(id)},
            include : {transaction_detail: true}
        })

        if(!findTransaction){
            return res.status(400).json({
                message: `Transaction is not found`
            })
        }

        // read a request data
        const cashier_name: string = req.body.chasier_name || findTransaction.cashier_name
        const order_date: Date = new Date (req.body.order_date || findTransaction.order_date)
        const transaction_detail: TransactionDetail[] = req.body.transaction_detail

        /**empty detail transaction based on transaction id*/
        await prisma.transaction_detail
            .deleteMany({
                where: {transaction_id: Number(id)}
            })

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
        const saveTransaction = await prisma.transaction.update({
            where: {
                id: Number(id)
            },
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
                transsantion_id: saveTransaction.id,
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
            message: `Transaction has been updated`
        })

    } catch (error) {
        return res.status(500).json(error)
    }
}

export { createTransaction, readTransaction, deleteTransaction, updateTransaction }