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

// Route for creating a new user
router.post("/createUser", async (req, res) => {
    // Extract user data from the request body
    const { FName, LName, Contact, DOB, Address, Photo, Password } = req.body;
    const { Email } = req.body;

    // Check if all required fields are provided
    if (!FName || !LName || !Contact || !DOB || !Address || !Password || !Email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Convert email to lowercase for consistency
    const EmailToLowerCase = Email.toLowerCase();

    try {
        // Check if the email already exists in the UserLogin table
        const email = await db.UserLogin.findOne({ where: { Email: EmailToLowerCase } });
        if (email) {
            return res.status(409).json("User Already Exists.");
        }

        // Hash the password before storing it
        const HashedPassword = await bcrypt.hash(Password, 10);

        // Create a new user in the UserDetails table
        const UserDetailsResult = await db.UserDetails.create({ FName, LName, Contact, DOB, Address, Enable: true });
        const UserID = UserDetailsResult.UserID;

        // Create a new user login entry in the UserLogin table
        const UserLoginResult = await db.UserLogin.create({ Password: HashedPassword, Email: EmailToLowerCase, Role: "user", UserID });

        // Respond with the created user details
        res.status(201).json({
            UserDetails: UserDetailsResult,
            UserLogin: UserLoginResult
        });
    } catch (err) {
        // Handle validation errors or other issues
        console.error('Validation Error:', err.errors ? err.errors.map(e => e.message) : err.message);
        res.status(400).json({ error: err.message });
    }
});

// Route for fetching all users from the UserDetails table
router.get("/fetchAllUsers", async (req, res) => {
    try {
        // Fetch all users
        const users = await db.UserDetails.findAll();

        // Respond with the list of users
        res.status(200).json({ data: users });
    } catch (err) {
        // Handle errors that occur during fetching
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for fetching all users from the UserLogin table
router.get("/fetchAllUsersLogin", async (req, res) => {
    try {
        // Fetch all user login entries
        const users = await db.UserLogin.findAll();

        // Respond with the list of users
        res.status(200).json({ data: users });
    } catch (err) {
        // Handle errors that occur during fetching
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for user login
router.post("/login", async (req, res) => {
    // Extract email and password from the request body
    const { Email, Password } = req.body;

    try {
        // Find the user with the given email
        const UserToVerify = await db.UserLogin.findOne({ where: { Email } });

        if (!UserToVerify) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the stored hashed password
        const ValidatePassword = await bcrypt.compare(Password, UserToVerify.Password);

        if (!ValidatePassword) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = Jwt.sign({ id: UserToVerify.UserID }, SECRET_KEY, { expiresIn: "24h" });

        // Respond with the token and UserID
        res.status(200).json({ token, UserID: UserToVerify.UserID });

    } catch (err) {
        // Handle errors that occur during login
        console.error(err);
        res.status(500).json(err.message);
    }
});

// Route for verifying JWT token
router.post('/verifyToken', (req, res) => {
    // Extract token from the "Authorization" header
    const token = req.headers.authorization.split(' ')[1]; // Extract token from "Bearer <token>"
    
    if (!token) {
        return res.status(401).json({ valid: false, message: 'No token provided' });
    }

    // Verify the token using JWT
    Jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ valid: false, message: 'Token is invalid or expired' });
        }

        // Token is valid, respond with the decoded user data
        res.status(200).json({ valid: true, user: decoded });
    });
});

module.exports = router; // Export the router to be used in other files
