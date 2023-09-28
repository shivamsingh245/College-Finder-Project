const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const favicon = require('serve-favicon');
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname,"public")));
app.use(favicon(__dirname + '/favicon.ico'));

app.use(cookie());
app.use(express.json());

app.use("/",require("./routes/pages"));
app.use("/api",require("./controllers/userAuth"));
app.use("/apidata",require("./controllers/getData"));

app.listen(PORT, () => {
    console.log(`App has started on port ${PORT}`);
});




