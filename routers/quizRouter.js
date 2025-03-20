import { Router } from 'express';
const router = Router();

import {
    getAllQuizzes,
    getQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz,
} from '../controllers/quizController.js'

import { validateQuizzesInput, validateIdParam } from '../middleware/validationMiddleware.js';

router.route('/').get(getAllQuizzes).post(validateQuizzesInput, createQuiz);
router
    .route('/:id')
    .get(getQuiz)
    .patch(validateQuizzesInput, validateIdParam, updateQuiz)
    .delete(validateIdParam, deleteQuiz);

export default router;