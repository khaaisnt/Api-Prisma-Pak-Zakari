import {Router} from 'express';
import {
    createTransaction, 
    readTransaction, 
    deleteTransaction, 
    updateTransaction
} from '../controller/transactionController';
import {createValidation, updateValidation} from '../middleware/transactionValidation';
import { authValidation } from '../middleware/adminValidation';
import { verifyToken } from '../middleware/authorization';

const router = Router();

router.post(`/`, [verifyToken ,createValidation],createTransaction);
router.get(`/`, [verifyToken],readTransaction);
router.put(`/:id`, [verifyToken, updateValidation],updateTransaction);
router.delete(`/:id`, [verifyToken, authValidation],deleteTransaction);

export default router;