import {Router} from 'express';
import {createTransaction} from '../controller/transactionController';
import {createValidation} from '../middleware/transactionValidation';

const router = Router();

router.post(`/`, [createValidation],createTransaction);

export default router;