
const express = require("express");
require('dotenv').config()
var bodyParser = require('body-parser');
var cors = require('cors')

const mongodbConnect  = require('./database/dbconn');

const adminRoutes = require('./routes/admin.js');
const companyRoutes = require('./routes/company.js');
const employeeRoutes = require('./routes/employee.js');

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
 
app.get('/v1/api', (req, res) => {
  res.send("Responding with Messages informing the world of the changes we have masde to the repo")
});

// app.use('/v1/api/admin', adminRoutes(app)); 
// app.use('/v1/api/company', companyRoutes(app));
// app.use('/v1/api/employee', employeeRoutes(app));
  
const PORT = process.env.PORT|| 5000;
app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))

// // Connecting to database
// mongodbConnect()
//   .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
//   .catch((error) => console.log(`${error} did not connect`));

  