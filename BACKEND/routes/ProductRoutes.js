const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("../models");
const { when } = require("joi");
//const PORT= process.env.PORT || 3000;
const router = express.Router();


router.use(cors());
router.use(morgan("dev"));
router.use(express.json());

// retrive all products 
router.get("/products", async (req, res) => {

    try {
        console.log("inside try block ");
        const products = await db.Product.findAll();
        res.json({ data: products });

    } catch (err) {

        console.log(err.message);
    }
});

// retrieve products whose Show columns is true 
router.get("/productsCondition", async (req, res) => {

    try {
        console.log("inside try block ");
        const products = await db.Product.findAll({ where: { Show: true } });
        res.json({ data: products });

    } catch (err) {

        console.log(err.message);
    }
});

// Add new Product
router.post("/products", async (req, res) => {
    try {
        const { ProductID, Quantity, Name, Description, Price, CategoryID, Show } = req.body;

        // Validation of the input data can be added here

        console.log("Inside try block");
        const product = await db.Product.create({
            ProductID, Quantity, Description, Price, CategoryID, Show, Name
        });

        // Send a response with a 201 status code
        res.status(201).json({ data: product });

    } catch (err) {
        console.error(err.message);
        // Send an error response with a 500 status code
        res.status(500).json({ error: "An error occurred while creating the product" });
    }
});

//Update the existing product
router.put("/products", async (req, res) => {

    try {
        const { ProductID, Quantity, Name, Description, Price, CategoryID, Show } = req.body;

        // Validation of the input data can be added here

        console.log("Inside try block");
        const product = await db.Product.update({
            Quantity: Quantity,
            Description: Description,
            Price: Price,
            Show: Show,
            Name: Name,
            CategoryID: CategoryID
        }, {
            where: {
                ProductID: ProductID
            }
        });

        // console.log("Res will be started");
        // Send a response with a 201 status code
        res.status(201).json({ message: "Product updated successfully", data: product });

    } catch (err) {
        console.error(err.message);
        // Send an error response with a 500 status code
        res.status(500).json({ error: "An error occurred while creating the product" });
    }
});


// It changes the Show column to make product accesible or inaccessible 
router.put("/visibility", async (req, res) => {

    const { ProductID,Show } = req.body;
    const product = await db.Product.update({
        Show: Show,
    },
        {
            where: {
                ProductID: ProductID,
            }
        })

        res.status(200).json({
            message: Show ? "Product is visible" : "Product is not visible"
        });
});


module.exports = router;