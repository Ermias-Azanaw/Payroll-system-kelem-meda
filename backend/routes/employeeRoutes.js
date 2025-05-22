const express = require('express');
const { addEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware(['HR', 'Admin']), addEmployee);
router.get('/', authMiddleware(['HR', 'Approver', 'Admin']), getEmployees);
router.put('/:id', authMiddleware(['HR', 'Admin']), updateEmployee);
router.delete('/:id', authMiddleware(['Admin']), deleteEmployee);

module.exports = router;