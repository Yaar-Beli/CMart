const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("../models");
//const PORT= process.env.PORT || 3000;
const router = express.Router();


router.use(cors());
router.use(morgan("dev"));
router.use(express.json());


router.get("/categories", async (req, res) => {

    try {

        console.log("inside try block ");
        const categories = await db.Category.findAll();
        res.json({ data: categories});

    } catch (err) {

        console.log(err.message);
    }
});
router.get("/categoriesCondition", async (req, res) => {

    try {

        console.log("inside try block ");
        const categories = await db.Category.findAll({Where : {Show:true}});
        res.json({ data: categories});

    } catch (err) {

        console.log(err.message);
    }
});



router.post("/categories", async (req, res) => {
    try {
        const { Name, CategoryID, Show } = req.body;

        // Validation of the input data can be added here
        
        console.log("Inside try block");
        const categories = await db.Category.create({
        Name, CategoryID, Show
        });
        
        // Send a response with a 201 status code
        res.status(201).json({ data: categories });

    } catch (err) {
        console.error(err.message);
        // Send an error response with a 500 status code
        res.status(500).json({ error: "An error occurred while creating the product" });
    }
});


router.put("/visibility", async (req, res) => {

    const { CategoryID,Show } = req.body;
    const product = await db.Product.update({
        Show: Show,
    },
        {
            where: {
                CategoryID:CategoryID,
            }
        })

        res.status(200).json({
            message: Show ? "Product is visible" : "Product is not visible"
        });
});





module.exports = router;