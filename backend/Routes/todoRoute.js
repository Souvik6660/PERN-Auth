import {Router} from 'express';
import { createTodo, deleteTodo, getAllTodo, updateTodobyuserId } from '../Controllers/todosControllers.js';
import { authMiddleware } from '../Middlewares/authMiddleware.js';

const router=Router();

router.post('/create',authMiddleware,createTodo);
router.get('/getall',authMiddleware,getAllTodo);
router.put('/update/:id',authMiddleware,updateTodobyuserId);
router.delete('/delete/:id',authMiddleware,deleteTodo);

export default router;