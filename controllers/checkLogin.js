const db = require("../config");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkLogin = (req,res,next) =>{ 
    if(!req.cookies.loginCookie) {
        return next();
    }

    try {
        const userVerified = jwt.verify(req.cookies.loginCookie,process.env.SECRET_KEY);
        db.query("SELECT * FROM users WHERE id = ?",[userVerified.id],(error,result)=>{
            if (error) {
                return next();
            }
            req.user = result[0];
            return next();
        })
    } catch (error) {
        if (error) {
            return next();
        }
    }
}

module.exports = checkLogin;