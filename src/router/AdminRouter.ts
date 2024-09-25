import { Router } from "express";
import {
  createAdmin,
  deleteAdmin,
  readAdmin,
  updateAdmin,
  authentication,
} from "../controller/AdminController";
import {
  createValidation,
  updateValidation,
  deleteValidation,
  authValidation,
} from "../middleware/adminValidation";
import { verifyToken } from "../middleware/authorization";
const router = Router();

router.post(`/`, [verifyToken ,createValidation], createAdmin);

router.get(`/`, [verifyToken], readAdmin);

router.put(`/:id`, [verifyToken ,updateValidation], updateAdmin);

router.delete(`/:id`, [verifyToken ,deleteValidation], deleteAdmin);

router.post(`/auth`, [authValidation], authentication);

export default router;
