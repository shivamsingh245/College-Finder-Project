const sql = require("mysql2");
require("dotenv").config();

const db = sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((error)=>{
    if(error) {
        console.log(error);
    }
    else{
        console.log("Database connected");
    }
});

module.exports = db;