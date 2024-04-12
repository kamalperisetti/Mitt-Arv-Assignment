const express = require("express")
const cors = require('cors')
const sqlite3 = require("sqlite3")
const path = require("path")
const {open} = require("sqlite")
const { error } = require("console")
const jwt = require("jsonwebtoken")
const app = express()

app.use(cors())
app.use(express.json())

const dbPath = path.join(__dirname, "userdetails.db")
let db = null
const initializineDbServer = async() => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        await db.exec(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        );
        `);
        app.listen(5001, () => {
            console.log("app listining on port:5001")
        })
    }catch(e){
        console.log(e.message)
    }
}

initializineDbServer()

app.post("/register", async(req, res) => {
    const {username, password} = req.body;
    const check = `SELECT * FROM users WHERE username LIKE "${username}"`
    const reeee = await db.get(check)
    if(reeee !== undefined){
        res.status(401).json("user Already Exists")
        console.log("already")
    }else{
        try{
            const result = await db.run("INSERT INTO users (username, password) VALUES(?, ?)", [username, password])
            res.status(200).json({success: true, userId: result.lastID})
            console.log("User Created Successfully")
        }catch(e){
            console.log(error.message, "Hello THere")
            res.status(500).json({success:false, error:"Internal Server Error Vachindhi"})
        }
    }
    
})

app.post("/login", async(req, res) => {
    const {username, password} = req.body
  
    const result = await db.get(`SELECT * FROM users WHERE username LIKE "${username}" AND password LIKE "${password}"`)
    try{
        if(result){
            
            console.log("Login Success")
            const jwt_token = jwt.sign({username:username}, "forlogin")
            res.status(200).json({jwtToken: jwt_token})
        }else{
            res.status(401).json({success:false, error: "*Invalid Credentials"})
            console.log("*Incalid Credentials")
        }
    }catch(e){
        res.json({success:false, error:"Server Error During Login"})
    }
})

// app.get("/", async(req, res)=> {
//     const result = `SELECT * FROM users WHERE username LIKE "kamal1"`
//     const ress = await db.get(result)
//     res.send(ress)
//     console.log(ress)
//     if(ress === undefined){
//         console.log("not available")
//     }
// })