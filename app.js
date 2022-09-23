//express dependencie
const express = require("express");
const app = express();

//dotenv dependencie
const dotenv = require("dotenv");
const exp = require("constants");
dotenv.config({path:"./env/.env"});

//resources in folder public
app.use("/src", express.static(__dirname + "/public"));


// template engine
app.set("view engine", "ejs");

// connection database
const connection = require("./database/db");



app.get("/", (req, res)=> {
    res.render("index");
})

app.listen(4000, (req, res)=> {
    console.log("Corriendo puerto 4000");
})