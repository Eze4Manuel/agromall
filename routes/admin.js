const express = require("express");

const { createAdmin } = require('../controllers/admin.js');

const router = express.Router();

const { auth } = require('../middleware/auth');

function routes(app) {

    router.post('/create_admin', createAdmin);
    
    return router;
};

module.exports = routes;