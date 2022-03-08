const express = require("express");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const config = require('../database/data');
const MongoDBFunctions = require('../database/functions');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
require('dotenv').config()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();
 


exports.createAdmin = async (req, res) => {
    let data = req.body;

    try {
        const existingUser = await MongoDBFunctions.getAdmin(config.dbClient, 'users', data.email);

        // Checking if user already exists
        if (existingUser != null) return res.status(400).json({ msg: "User already exists" });

        let payload = {
            email: data.email,
            password: await bcrypt.hash(data.password, 12),
            user_type: "admin",
            created_At: new Date(Date.now()),
            modified_At: new Date(Date.now())
        }
        // Saving user data to DB
        let result = await MongoDBFunctions.registerUser(config.dbClient, 'users', payload);

        return res.status(200).json({ data: 'OK', status_code: res.statusCode, status: "success" });
    }
    catch (e) {
        console.log(`Something went wrong ${e}`);
        res.status(500).json({ msg: "Something went wrong" });
    }

}

exports.router = router;