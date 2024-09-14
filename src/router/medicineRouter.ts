import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, UpdateMedicine } from "../controller/medicineController";
import { createValidation, updateValidation } from "../middleware/medicineValidation";
const router = Router();

router.post(`/`, [createValidation], createMedicine)

router.get(`/`, readMedicine)

router.put(`/:id`, [updateValidation], UpdateMedicine)

router.delete(`/:id`, [deleteMedicine], deleteMedicine)

export default router