const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');

const router = require('./routers/router');
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'data')));
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})


app.use(router);

const server = app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})
