const express = require("express"); // Import Express for building the server
const cors = require("cors"); // Import CORS for handling cross-origin requests
const morgan = require("morgan"); // Import Morgan for logging HTTP requests
const db = require("../models"); // Import database models
const Jwt = require("jsonwebtoken"); // Import JSON Web Token library
const bcrypt = require("bcryptjs"); // Import Bcrypt for hashing passwords

// Get the secret key for JWT from environment variables
const SECRET_KEY = process.env.SECRET_KEY;

const router = express.Router(); // Create a new router object

// Middleware setup
router.use(cors()); // Allow cross-origin requests
router.use(morgan("dev")); // Log HTTP requests to the console
router.use(express.json()); // Parse JSON bodies in requests


// Route for user login
router.post("/login", async (req, res) => {
  // Extract email and password from the request body
  const { Email, Password } = req.body;
  console.log("email", Email);

  const EmailToLowerCase = Email.toLowerCase();

  try {
    // Find the user with the given email
    const UserToVerify = await db.UserLogin.findOne({ where: { Email : EmailToLowerCase } });

    if (!UserToVerify) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const ValidatePassword = await bcrypt.compare(
      Password,
      UserToVerify.Password
    );

    if (!ValidatePassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = Jwt.sign({ id: UserToVerify.UserID }, SECRET_KEY, {
      expiresIn: "24h",
    });

    // Respond with the token and UserID
    res.status(200).json({ token, UserID: UserToVerify.UserID });
  } catch (err) {
    // Handle errors that occur during login
    console.error(err);
    res.status(500).json(err.message);
  }
});

// Route for verifying JWT token
router.post("/verifyToken", (req, res) => {
  // Extract token from the "Authorization" header
  const token = req.headers.authorization.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }

  // Verify the token using JWT
  Jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ valid: false, message: "Token is invalid or expired" });
    }

    // Token is valid, respond with the decoded user data
    res.status(200).json({ valid: true, user: decoded });
  });
});

router.post("/getUserID", (req, res) => {
  try {
    // Extract the token from the Authorization header
    const {token} = req.body;
    // console.log(token);
    // Verify and decode the token using the secret key
    const decoded = Jwt.verify(token, SECRET_KEY);
    // console.log("decoded");
    // Extract the UserID from the decoded token
    const UserID = decoded.id;

    // Log the decoded token (for debugging purposes)
    // console.log(decoded);

    // Respond with the UserID
    res.json({ UserID: UserID });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

module.exports = router; // Export the router to be used in other files
