import { Router } from "express";
import {createAdmin, deleteAdmin, readAdmin, updateAdmin} from "../controller/AdminController"
import {createValidation, updateValidation, deleteValidation} from "../middleware/Admin.validation"
const router = Router();

router.post (`/`, [createValidation], createAdmin)

router.get(`/`, readAdmin)

router.put(`/:id`, [updateValidation], updateAdmin)

router.delete(`/:id`, [deleteValidation], deleteAdmin)

export default router