const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((e)=>{
    if(e){
        console.log("Error de conexion : " + e);
    }
    console.log("conexion exitosa restaurantes")
});

module.exports = connection;