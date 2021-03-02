const express = require('express');
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

//Create a database
app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE mysqlexpress';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created');
    });
});

//Create Table
app.get('/createtest', (req,res) => {
    let sql = 'CREATE TABLE test(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Created test table');
    });
});

//Insert Data
app.get('/addtest', (req,res) => {
    let test = { title: 'Second Test', body: 'This is Second Test'};
    let sql = 'INSERT INTO test SET ?';
    let query = db.query(sql, test, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Second Test Added');
    });
});

//Select 
app.get('/showtest/:id', (req, res) => {
    let sql = `SELECT *FROM test WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Test 2 fetched');
    });
});

//Update
app.get('/update/:id', (req, res) => {
    let newTitle = 'Last Test';
    let sql = `UPDATE test SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Updated');
    });
});

//Delete
app.get('/delete/:id', (req,res) => {
    let sql = `DELETE FROM test WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('DELETED');
    });
});

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//methods
app.get('/messages', function(req, res) {
    res.send({ messages: messages });
});

app.post('/messages', (req,res) => {
    if(req.body.sender === req.body.receiver){
        res.send("You Cannot Send Message to Yourself");
    }else{
        const msgs = messages.find(users => (users.sender === parseInt(req.body.sender) 
            && users.receiver === parseInt(req.body.receiver)) 
            || (users.sender === parseInt(req.body.receiver)
            && users.receiver === parseInt(req.body.sender)));
        const sms = req.body.message1;
        const rms = req.body.message2;
        if(rms === ''){
            if(msgs.sender === parseInt(req.body.sender)){
                msgs.message1.push(sms);
            } else {
                msgs.message2.push(sms);
            }
        }
        else{
            if(msgs.sender === parseInt(req.body.sender)){
                msgs.message2.push(rms);
            } else {
                msgs.message1.push(rms);
            }
        }
    res.send('Success');
    }
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${ PORT }`));