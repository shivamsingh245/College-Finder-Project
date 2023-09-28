const express = require("express");
const checkLogin = require("../controllers/checkLogin");
const router = express.Router();

router.get("/",(req,res)=>{
    res.sendFile("index.html",{root:"./public/html"});
});

router.get("/register",(req,res)=>{
    res.sendFile("register.html",{root:"./public/html"});
});

router.get("/login",(req,res)=>{
    res.sendFile("login.html",{root:"./public/html"});
});

router.get("/college_details",checkLogin,(req,res)=>{
    if(req.user){
        res.sendFile("college_data.html",{root:"./public/html"});
    }else{
        res.sendFile("login.html",{root:"./public/html"});
    }
});

router.get("/allCollegeData",(req,res)=>{
    res.sendFile("all_college_data.html",{root:"./public/html"});
});

router.get("/logout",(req,res) =>{
    res.clearCookie("loginCookie");
    res.redirect("/");
});

module.exports = router;