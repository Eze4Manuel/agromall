
const { ObjectId } = require("bson");

const VALIDATE = {

    validateCompanyCreate: function (data) {
        console.log(data);
        let error = '';
        
        if(typeof data?.name  !== 'string')
        error = 'name field must be string';

        if(typeof data?.email  !== 'string')
        error = 'name field must be string';
        
        if(typeof data?.password  !== 'string')
        error = 'name field must be string';

        if(error.length == 0) return true;
        else return error;
    },

    validateEmployeeCreate: function (data) {
        console.log(data);
        let error = '';
        if(typeof data?.name  !== 'string')
        error = 'name field must be string';

        if(typeof data?.email  !== 'string')
        error = 'name field must be string';
        
        if(typeof data?.password  !== 'string')
        error = 'name field must be string';

        if(error.length == 0) return true;
        else return error;
    },
}

module.exports = VALIDATE;


