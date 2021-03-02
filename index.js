const express = require('express');
const uuid = require('uuid');
const mysql = require('mysql');
const path = require('path');
const exphbs = require('express-handlebars');
const messages = require('./Members');
const app = express();
//const logger = require('./middleware/logger');

//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mysqlexpress'
});

//Connect
db.connect((err) => {
    if(err) throw err;
    console.log('Mysql Connected...');
});

//Select 
app.get('/getusers', (req, res) => {
    let sql = `SELECT *FROM users`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send({ users: result });
    });
});

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//methods
app.get('/getmessages', function(req, res) {
   
    let sql = `SELECT *FROM messages WHERE (leftuser = '${req.query.sender}' AND rightuser = '${req.query.receiver}') OR leftuser = '${req.query.receiver}' AND rightuser = '${req.query.sender}'`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        const sortedUser = result.sort((a,b) => b.date < a.date? 1: -1 );
        res.send({ users: sortedUser});
    });
});

app.post('/messages', (req,res) => {
    if(req.body.sender === req.body.receiver){
        res.send("You Cannot Send Message to Yourself");
    }else{
        let add = {id: uuid.v4(), leftuser: req.body.sender, rightuser: req.body.receiver, message: req.body.message}
        let sql = 'INSERT INTO messages SET ?';
        db.query(sql, add, (err, result) => {
            console.log(result);
            if (err) throw err;
        })
    }
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${ PORT }`));