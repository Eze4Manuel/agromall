const express = require("express");

const { createCompany, getCompanies, getCompany, updateCompany, deleteCompany, loginCompany, getCompanyEmployees } = require('../controllers/company.js');

const router = express.Router();

const { auth } = require('../middleware/auth');

function routes(app) {

    router.post('/create_company', createCompany);
    router.get('/get_companies', getCompanies);
    router.get('/get_company', getCompany);
    router.put('/update_company/:company_id', updateCompany);
    router.delete('/delete_company/:company_id', deleteCompany);

    router.post('/login', loginCompany);
    router.get('/get_company_employees', getCompanyEmployees);


    return router;
};

module.exports = routes;