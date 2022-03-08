
const jwt = require('jsonwebtoken');
require('dotenv').config()


exports.auth = async (req, res, next) => {
    if(req.headers.authorization){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const isCustomAuth = token.length < 500; 
            let decodedData;
            if(token && isCustomAuth) {
                decodedData = jwt.verify(token, process.env.TOKEN_KEYPHRASE);
                req.user_id = decodedData?.id;
                req.email = decodedData?.email;
                
            }else{
                decodedData = jwt.decode(token);
                req.user_id = decodedData?.sub;
            }
            next();
        }
        catch(e){
            console.log(e);
            return res.status(404).json({ msg: e.message });
        }
    }else{
        return res.status(401).json({ msg: "Unauthorized Access" });
    }   
}