const express = require('express');
const cors = require('cors');
const laptopRouter = require('./router/laptopRouter');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use('/api/laptops', laptopRouter);

app.listen(6161, () => console.log('server is listening on port 6161'));