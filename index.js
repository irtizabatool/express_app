const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const messages = require('./Members');
//const logger = require('./middleware/logger');

const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// middleware for handle bars
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//app.use(logger);
app.get('/', (req,res) => {
    //const arr = messages.find(usr => (usr.sender == req.params.sender && usr.receiver == req.params.receiver) || usr.sender == req.params.receiver && usr.receiver == req.params.sender);
    res.render('index'{
        messages
    });
});

// app.post('/', (req,res) => {
//     if(req.body.sender === req.body.receiver){
//         res.send("You Cannot Send Message to Yourself");
//     }else{
//     const msgs = messages.find(users => (users.sender === parseInt(req.body.sender) 
//         && users.receiver === parseInt(req.body.receiver)) 
//         || (users.sender === parseInt(req.body.receiver)
//         && users.receiver === parseInt(req.body.sender)));
//     //console.log(req.body.message);
//     const sms = req.body.smessage;
//     const rms = req.body.rmessage;
//     if(rms === ''){
//         if(msgs.sender === parseInt(req.body.sender)){
//             msgs.message1.push(sms);
//         } else {
//             msgs.message2.push(sms);
//         }
//     }
//     else{
//         if(msgs.sender === parseInt(req.body.sender)){
//             msgs.message2.push(rms);
//         } else {
//             msgs.message1.push(rms);
//         }
//     }
//     //const ms = req.body.message;
    
//    res.render('/',{
//        msgs
//    });
// }
// });
// set static folder
//app.use(express.static(path.join(__dirname, 'public')));

//Members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${ PORT }`));