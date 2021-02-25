const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const messages = require('./Members');
//const logger = require('./middleware/logger');

const app = express();

// middleware for handle bars
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//app.use(logger);
app.get('/', (req,res) => res.render('index', {
    title: 'Message App',
    messages
}));
//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${ PORT }`));