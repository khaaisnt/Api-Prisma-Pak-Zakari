import Express from "express";
import MedicineRoute from "./router/medicineRouter"

const app = Express()

app.use(Express.json())

app.use(`/medicine`, MedicineRoute)

const PORT = 5050
app.listen(PORT, () => {
    console.log(`server DrugStore run on port ${PORT}`)
})