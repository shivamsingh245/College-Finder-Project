const express = require("express");
const router = express.Router();
const db = require("../config");
const checkLogin = require("./checkLogin");

// Search College-> http://localhost:5000/apidata/searchCollege
router.post("/searchCollege",(req,res)=>{
    const {collegeName} = req.body;

    if(!collegeName) {
        return res.json({status:"error",error:"Please enter college name or course name!"});
    }

    const sql = `SELECT * FROM college_names WHERE name LIKE '%${collegeName}%' OR course LIKE '%${collegeName}%' ORDER BY name`;

    db.query(sql,(error,results)=>{
        if(error) {
            console.log(error);
        }

        if(results.length===0) return res.json({status:"error",error:"College or course does not exist in database!"});

        else{
            return res.json({results});
        }
    });
});

// Getting all college data-> http://localhost:5000/apidata/allCollegeData
router.get("/allCollegeData",(req,res)=>{
    const sql = "SELECT * FROM college_names ORDER BY name";

    db.query(sql,(error,results)=>{
        if(error) {
            console.log(error);
        }

        else{
            return res.json({results});
        }
    });
});

// Getting user data-> http://localhost:5000/apidata/userData
router.get("/userData",checkLogin,(req,res)=>{
    const user = req.user;
    res.json(user);
});

module.exports = router;