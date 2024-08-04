const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("../models");
//const PORT= process.env.PORT || 3000;
const router = express.Router();


router.use(cors());
router.use(morgan("dev"));
router.use(express.json());


router.get("/products", async (req, res) => {

    try {

        console.log("inside try block ");
        const products = await db.Product.findAll();
        res.json({ data: products });

    } catch (err) {

        console.log(err.message);
    }
});

router.post("/products", async (req, res) => {

    try {
        const { ProductID, Quantity, Description, Price, Category } = req.body;
        console.log("inside try block ");
        const products = await db.Product.create({
            ProductID, Quantity, Description, Price, Category
        });
        res.json({ data: products });

    } catch (err) {

        console.log(err.message);
    }
});




module.exports = router;