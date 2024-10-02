import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, UpdateMedicine } from "../controller/medicineController";
import { createValidation, updateValidation } from "../middleware/medicineValidation";
import { uploadMedicinePhoto } from "../middleware/uploadMedicinePhoto";
import { verifyToken } from "../middleware/authorization";
const router = Router();

router.post(`/`, [verifyToken ,uploadMedicinePhoto.single('photo'), createValidation], createMedicine)

router.get(`/`,readMedicine)

router.put(`/:id`,[verifyToken], [uploadMedicinePhoto.single(`photo`),updateValidation], UpdateMedicine)

router.delete(`/:id`, [verifyToken],[deleteMedicine], deleteMedicine)


export default router