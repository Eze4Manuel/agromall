const { ObjectId } = require("bson");

const MongoDBFunctions = {
    db: process.env.MONGODB_DATABASE,

    getAdmin: async function (client, collection, email) {
        try {
            const cursor = await client.db(this.db).collection(collection).findOne({ email });
            return cursor;  
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },
    registerUser: async function (client, collection, newUser) {
        try {
            const result = await client.db(this.db).collection(collection).insertOne(newUser);
            console.log(`New user registered with the following ID: ${result.insertedId}`);
            return (result.acknowledged) ? result : "Error occurred";
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },




    getCompany: async function (client, collection, email) {
        try {
            const cursor = await client.db(this.db).collection(collection).findOne({ email });
            return cursor;  
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },
    getCompanyByID: async function (client, collection, _id) {
        try {
            const cursor = await client.db(this.db).collection(collection).findOne({ _id: ObjectId(_id) });
            return cursor;  
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },
    getAllCompany: async function (client, collection) {
        try {
            let result = await client.db(this.db).collection(collection).find().project({password: 0});
            result = await result.toArray()
            return (result) ? result : "error";  
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },
    createCompany: async function (client, collection, company) {
        try {
            const result = await client.db(this.db).collection(collection).insertOne(company);
            console.log(`New user registered with the following ID: ${result.insertedId}`);
            return (result.acknowledged) ? result : "Error occurred";
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },

    updateCompany: async function (client, collection, company_id, payload ) {
        try {
            const result = await client.db(this.db).collection(collection).updateOne(
                { _id: ObjectId(company_id) },
                { $set: payload });
            return (result) ? result : "Error occurred";
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },
    
    deleteCompany: async function (client, collection, company_id ) {
        try {
            const result = await client.db(this.db).collection(collection).deleteOne({ _id: ObjectId(company_id) });
            return (result) ? result : "Error occurred";
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },

    getCompanyEmployee: async function (client, collection, company_name) {
        try {
            let result = await client.db(this.db).collection(collection).find({ company: company_name});
            result = await result.toArray()
            return (result) ? result : "error";  
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },

    


    




    getEmployee: async function (client, collection, email) {
        try {
            const cursor = await client.db(this.db).collection(collection).findOne({ email });
            return cursor;  
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },
    getEmployeeByID: async function (client, collection, _id) {
        try {
            const cursor = await client.db(this.db).collection(collection).findOne({ _id: ObjectId(_id) });
            return cursor;  
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },
    getAllEmployee: async function (client, collection) {
        try {
            let result = await client.db(this.db).collection(collection).find().project({password: 0});
            result = await result.toArray()
            return (result) ? result : "error";  
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },
    createEmployee: async function (client, collection, employee) {
        try {
            const result = await client.db(this.db).collection(collection).insertOne(employee);
            console.log(`New user registered with the following ID: ${result.insertedId}`);
            return (result.acknowledged) ? result : "Error occurred";
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },


    updateEmployee: async function (client, collection, employee_id, payload ) {
        try {
            const result = await client.db(this.db).collection(collection).updateOne(
                { _id: ObjectId(employee_id) },
                { $set: payload });
            return (result) ? result : "Error occurred";
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },
    deleteEmployee: async function (client, collection, employee_id ) {
        try {
            const result = await client.db(this.db).collection(collection).deleteOne({ _id: ObjectId(employee_id) });
            return (result) ? result : "Error occurred";
        } catch (e) {
            console.log(`Something went wrong ${e}`);
        }
    },


    




}

module.exports = MongoDBFunctions;

