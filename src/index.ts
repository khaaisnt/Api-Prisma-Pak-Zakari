import Express from "express";
import MedicineRoute from "./router/medicineRouter"
import AdminRouter from "./router/AdminRouter"

const app = Express()

app.use(Express.json())

app.use(`/medicine`, MedicineRoute)
app.use(`/admin`, AdminRouter)

const PORT = 5050
app.listen(PORT, () => {
    console.log(`server DrugStore run on port ${PORT}`)
})