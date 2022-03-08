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



exports.createCompany = async (req, res) => {
    let data = req.body;
    let payload = {};
    let resultData = {};
    try {

        // Filter/Validate data
        let validate = VALIDATE.validateCompanyCreate(data);

        // checking validation
        if (typeof validate != 'boolean') return res.status(400).json({ msg: validate });

        const existingCompany = await MongoDBFunctions.getCompany(config.dbClient, 'company', data.email);

        // Checking if user already exists
        if (existingCompany != null) return res.status(400).json({ msg: "Company already exists" });

        payload = {
            company_name: data.name,
            email: data.email,
            logo: data.logo,
            url: data.url,
            password: await bcrypt.hash(data.password, 12),
            created_At: new Date(Date.now()),
            modified_At: new Date(Date.now())
        }
        // Saving user data to DB
        let result = await MongoDBFunctions.createCompany(config.dbClient, 'company', payload);

        resultData =  {
            company_id : result.insertedId,
            name: data.name,
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


exports.getCompanies = async (req, res) => {
     
    try {
        const companies = await MongoDBFunctions.getAllCompany(config.dbClient, 'company');
        return res.status(200).json({ data: companies, status_code: res.statusCode, status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}

exports.getCompany = async (req, res) => {
    try {
        const company = await MongoDBFunctions.getCompanyByID(config.dbClient, 'company', req.query.company_id);   
        // releasing password
        company.password = ''
        return res.status(200).json({ data: company, status_code: res.statusCode, status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}

exports.updateCompany = async (req, res) => {
    let company_id = req.params.company_id;
    let payload =  req.body;
    try {
        // Updating password
        let result = await MongoDBFunctions.updateCompany(config.dbClient, 'company', company_id, payload, );

        console.log(result);
        if (result?.acknowledged) return res.status(200).json({ data: payload, status_code: res.statusCode, status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}


exports.deleteCompany = async (req, res) => {
    let company_id = req.params.company_id;
    try {
        // Updating password
        let result = await MongoDBFunctions.deleteCompany(config.dbClient, 'company', company_id, );

        console.log(result);
        if (result?.acknowledged) return res.status(200).json({ data: 'OK', status_code: res.statusCode, status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}


exports.loginCompany = async (req, res) => {
    let data = req.body;
    try {
        const existingUser = await MongoDBFunctions.getAdmin(config.dbClient, 'company', data.email);

        // Checking if user already exists
        if (existingUser == null) return res.status(404).json({ msg: "User does not exist." });

        // Comparing password
        const isPasswordCorrect = await bcrypt.compare(data.password, existingUser.password);


        // Wrong credential check
        if (!isPasswordCorrect) return res.status(400).json({ msg: "Invalid credentials" });

            // Setting up token
            const token = jwt.sign({ email: data.email}, process.env.TOKEN_KEYPHRASE, { expiresIn: "1h" });
            

            const responseData = {
                _id: existingUser._id,
                email: existingUser.email,
                user_type: 'company',
                token: token,
                logo: existingUser.logo,
                url: existingUser.url,
                created_At: existingUser.created_At,
                modified_At: existingUser.created_At
            }
            return res.status(200).json({ data: responseData, status_code: res.statusCode, status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}


exports.getCompanyEmployees = async (req, res) => {
    try {
        const company = await MongoDBFunctions.getCompanyEmployee(config.dbClient, 'employee', req.query.company_name);
        // releasing password
        company.password = ''
        return res.status(200).json({ data: company, status_code: res.statusCode, status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }
}




exports.router = router;