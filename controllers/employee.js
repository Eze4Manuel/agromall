const express = require("express");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const config = require('../database/data');
const MongoDBFunctions = require('../database/functions');
const VALIDATE = require('../middleware/validate');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
require('dotenv').config()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();


exports.createEmployee = async (req, res) => {
    let data = req.body;

    let payload = {};
    let resultData = {};

    try {

        // Filter/Validate data
        let validate = VALIDATE.validateEmployeeCreate(data);

        // checking validation
        if (typeof validate != 'boolean') return res.status(400).json({ msg: validate });

        const existingCompany = await MongoDBFunctions.getEmployee(config.dbClient, 'employee', data.email);

        // Checking if user already exists
        if (existingCompany != null) return res.status(400).json({ msg: "Employee already exists" });

        payload = {
            name: data.name,
            email: data.email,
            company: data.company,
            password: await bcrypt.hash(data.password, 12),
            created_At: new Date(Date.now()),
            modified_At: new Date(Date.now())
        }
        // Saving user data to DB
        let result = await MongoDBFunctions.createEmployee(config.dbClient, 'employee', payload);

        resultData = {
            employee_id: result.insertedId,
            employee_name: data.name,
            email: data.email,
            logo: data.logo,
            url: data.url,
            created_At: new Date(Date.now()),
            modified_At: new Date(Date.now())
        }
        return res.status(200).json({ data: resultData, status_code: res.statusCode, status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}


exports.getEmployees = async (req, res) => {
    try {
        const employees = await MongoDBFunctions.getAllEmployee(config.dbClient, 'employee');
        return res.status(200).json({ data: employees, status_code: res.statusCode, status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}

exports.getEmployee = async (req, res) => {
    console.log(req.query.employee_id);
    try {
        const employee = await MongoDBFunctions.getEmployeeByID(config.dbClient, 'employee', req.query.employee_id);
        // releasing password
        employee.password = ''
        return res.status(200).json({ data: employee, status_code: res.statusCode, status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}



exports.updateEmployee = async (req, res) => {
    let employee_id = req.params.employee_id;
    let payload =  req.body;
    try {
        // Updating password
        let result = await MongoDBFunctions.updateEmployee(config.dbClient, 'employee', employee_id, payload, );

        if (result?.acknowledged) return res.status(200).json({ data: payload, status_code: res.statusCode, status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}


// exports.deleteEmployee = async (req, res) => {
//     let employee_id = req.params.employee_id;
//     try {
//         // Updating password
//         let result = await MongoDBFunctions.deleteEmployee(config.dbClient, 'employee', employee_id, );

//         console.log(result);
//         if (result?.acknowledged) return res.status(200).json({ data: 'OK', status_code: res.statusCode, status: "success" });
//     }
//     catch (e) {
//         console.log(`Something went wrong ${e}`);
//         res.status(500).json({ msg: "Something went wrong" });
//     }
// }


exports.router = router;