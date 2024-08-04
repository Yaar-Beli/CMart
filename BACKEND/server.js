const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { Where } = require("sequelize/lib/utils");
const db = require("./models");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

//MiddleWare
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // Middleware to parse JSON bodiesd

db.sequelize.sync();
app.post("/users", async (req, res) => {
  try {
    // Destructure required properties from the request body
    const { FName, LName, Contact, DOB, Address, Photo } = req.body;

    // Validate input (you might want to add more validation)
    if (!FName || !LName || !Contact || !DOB || !Address) {
      return res
        .status(400)
        .json({ message: "All fields except Photo are required." });
    }

    // Create a new user record in the UserDetails table
    const newUser = await UserDetails.create({
      FName,
      LName,
      Contact,
      DOB,
      Address,
      Photo,
    });

    // Return the created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
});

app.get("/Products", async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});
