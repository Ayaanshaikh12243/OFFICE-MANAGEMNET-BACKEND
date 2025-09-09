
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

router.get('/', employeeController.getEmployees);
router.get('/new', employeeController.getEmployeeForm);
router.post('/new', employeeController.saveEmployee);
router.get('/edit/:id', employeeController.getEmployeeForm);
router.post('/edit/:id', employeeController.saveEmployee);
router.post('/delete/:id', employeeController.deleteEmployee);


module.exports = router;