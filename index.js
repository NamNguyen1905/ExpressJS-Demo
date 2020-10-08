const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./member');

const app = express();


//middleware
// app.use(logger);

//handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Member app',
    members
}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));





//api route member
app.use('/api/members', require('./routes/api/member'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
