const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("../models");
const router = express.Router();
const { Sequelize, Op } = require('sequelize');

router.use(cors());
router.use(morgan("dev"));
router.use(express.json());


router.post("/Search", async (req, res) => {

    const { Search } = req.body;
    try {
        const response = await db.Product.findAll({

            where: {
                [Op.or]: [
                  { Name: { [Op.like]: `%${Search}%` } },
                  { Description: { [Op.like]: `%${Search}%` } }
                ],
                
              }
        })
        res.status(200).json({ data: response })
    } catch (err) {
        console.log(err.message)

    }

});

module.exports = router;
