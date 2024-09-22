import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, UpdateMedicine } from "../controller/medicineController";
import { createValidation, updateValidation } from "../middleware/medicineValidation";
import { uploadMedicinePhoto } from "../middleware/uploadMedicinePhoto";
const router = Router();

router.post(`/`, [uploadMedicinePhoto.single('photo'), createValidation], createMedicine)

router.get(`/`, readMedicine)

router.put(`/:id`, [uploadMedicinePhoto.single(`photo`),updateValidation], UpdateMedicine)

router.delete(`/:id`, [deleteMedicine], deleteMedicine)


export default router