const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { Where } = require('sequelize/lib/utils');
const db = require('./models');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT;


//MiddleWare
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Middleware to parse JSON bodiesd

db.sequelize.sync();

app.get('/Products', async (req, res) => {
    try {

        const products = await db.Product.findAll();
        res.json({ data: products });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
