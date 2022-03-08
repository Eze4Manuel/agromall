const express = require("express");

const { createEmployee, getEmployee, getEmployees, updateEmployee, deleteEmployee} = require('../controllers/employee.js');

const router = express.Router();

const { auth } = require('../middleware/auth');

function routes(app) {
    router.post('/create_employee', createEmployee);
    router.get('/get_employees', getEmployees);
    router.get('/get_employee', getEmployee);
    router.put('/update_employee/:employee_id', updateEmployee);
    // router.delete('/delete_employee/:employee_id', deleteEmployee);

    return router;
};

module.exports = routes;