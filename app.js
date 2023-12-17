const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
const laptopRouter = require('./router/laptopRouter');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(laptopRouter);

app.listen(6161, () => console.log('server is listening on port 6161'));