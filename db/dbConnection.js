const mysql = require('mysql');
require('dotenv').config();

module.exports = class dbConnection{
    constructor(){
        // db정보 env로 빼자
        this.openConnection();
    }
    openConnection(){
        return new Promise((resolve, reject)=>{
            this.db = mysql.createConnection({
                host     : process.env.HOST,
                user     : process.env.TEST_USER_ID,
                password : process.env.TEST_USER_PW,
                database : process.env.DATABASE
            }); 
            this.db.connect();
        }) ;
    }
    closeConnection(){
        return new Promise((resolve, reject)=>{
            this.db.close();
            resolve(true);
        }) ;
    }
    get(query, params) {
        return new Promise((resolve, reject)=>{
            this.db.query(query, params , (error, results, fields)=>{
                if (error) {
                    console.log(error);
                    reject(" error: " + err.message);
                }
                console.log(results);
                resolve(results);
            });
        }) 
    }
}
