const express = require('express');
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:6161'
}

const app = express();

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'hello from express'});
});

app.listen(6161, () => console.log('server is listening on port 6161'));