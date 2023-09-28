const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../config");
const bcrypt = require("bcryptjs"); 
const router = express.Router();
require("dotenv").config();

// Registration-> http://localhost:5000/api/register 
router.post("/register",(req,res)=>{
    const {username,email,password,confirm_password} = req.body;

    if(!username || !email || !password || !confirm_password) {
        return res.json({status:"error",error:"Please enter your username, email and password!"});
    }

    if(username.length <= 4 ) {
        return res.json({status:"error",error:"Username must be greater than four characters!"});
    }

    if(password.length <= 4 ) {
        return res.json({status:"error",error:"Password must be greater than four characters!"});
    }

    if(password !== confirm_password) {
        return res.json({status:"error",error:"Password and confirm password do not match!"});
    }

    else{
        const sql = "SELECT email FROM users WHERE email = ?";
        db.query(sql,[email], async(error,result)=>{
            if(error) {
                console.log(error);
            }
            if(result[0]) {
                return res.json({status:"error",error:"Email already exists! Use different email!!"});
            }
            else{
                const hashedpassword = await bcrypt.hash(password,8);
                const sql = "INSERT INTO users SET ?";

                db.query(sql,{username:username,email:email,password:hashedpassword},(error,result)=>{
                    if(error) {
                        console.log(error);
                    }
                    else{
                        return res.json({status:"success",success:"User has been registered successfully!"});
                    }
                });
            }
        });
    }
});

// Login->http://localhost:5000/api/login
router.post("/login",(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password) {
        return res.json({status:"error",error:"Please enter your email and password!"});
    }
    else{
        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql,[email],async(error,result)=>{
        if(error) {
            console.log(error);
        }

        if(!result.length || !await bcrypt.compare(password,result[0].password)) {
            return res.json({status:"error",error:"Incorrect email or password!"});
        }
        
        else{
            const token = jwt.sign({id:result[0].id,username:result[0]},process.env.SECRET_KEY,{
                expiresIn: "90d"
            });
            const cookieOptions = {
                expiresIn:new Date(Date.now() + 90 * 24 * 60 *60 * 1000),
                httpOnly:true,
                secure:true,
                sameSite:"strict"
            } 
            res.cookie("loginCookie",token,cookieOptions);
            return res.json({status:"success",success:"User has been logged in successfully!"});
         }
        });
    }
});

module.exports = router;