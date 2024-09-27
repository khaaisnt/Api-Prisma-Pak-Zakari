import Express from "express";
import MedicineRoute from "./router/medicineRouter"
import AdminRouter from "./router/adminRouter"
import TransactionRouter from "./router/transactionRouter"

const app = Express()

app.use(Express.json())

app.use(`/medicine`, MedicineRoute)

app.use(`/admin`, AdminRouter)

app.use(`/transaction`, TransactionRouter)

const PORT = 5050
app.listen(PORT, () => {
    console.log(`server DrugStore run on port ${PORT}`)
})