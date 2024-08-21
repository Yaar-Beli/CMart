const express = require("express"); // Import Express for building the server
const cors = require("cors"); // Import CORS for handling cross-origin requests
const morgan = require("morgan"); // Import Morgan for logging HTTP requests
const db = require("../models"); // Import database models
const Jwt = require("jsonwebtoken"); // Import JSON Web Token library
const bcrypt = require("bcryptjs"); // Import Bcrypt for hashing passwords

// Get the secret key for JWT from environment variables
const SECRET_KEY =
  "1eb414c7d64cd43800d72359762956c59864504eec91f6d205482bd90b22a269";

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
    const email = await db.UserLogin.findOne({
      where: { Email: EmailToLowerCase },
    });
    if (email) {
      return res.status(409).json("User Already Exists.");
    }

    // Hash the password before storing it
    const HashedPassword = await bcrypt.hash(Password, 10);

    // Create a new user in the UserDetails table
    const UserDetailsResult = await db.UserDetails.create({
      FName,
      LName,
      Contact,
      DOB,
      Address,
      Enable: true,
    });
    const UserID = UserDetailsResult.UserID;

    // Create a new user login entry in the UserLogin table
    const UserLoginResult = await db.UserLogin.create({
      Password: HashedPassword,
      Email: EmailToLowerCase,
      Role: "user",
      UserID,
    });

    // Respond with the created user details
    res.status(201).json({
      UserDetails: UserDetailsResult,
      UserLogin: UserLoginResult,
    });
  } catch (err) {
    // Handle validation errors or other issues
    console.error(
      "Validation Error:",
      err.errors ? err.errors.map((e) => e.message) : err.message
    );
    res.status(400).json({ error: err.message });
  }
});

// Route for fetching all users from the UserDetails table
router.get("/fetchAllUsersDetails", async (req, res) => {
  try {
    // Fetch all users
    const users = await db.UserDetails.findAll();

    // Respond with the list of users
    res.status(200).json({ data: users });
  } catch (err) {
    // Handle errors that occur during fetching
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
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
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/fetchUsersLoginID", async (req, res) => {

    const {UserID} = req.body;
    
    try {
      // Fetch all user login entries
      const users = await db.UserLogin.findAll({where : {UserID} });
  
      // Respond with the list of users
      res.status(200).json({ data: users });
    } catch (err) {
      // Handle errors that occur during fetching
      console.error(err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  
// Route for fetching all users from the UserDetails table
router.post("/fetchUsersDetailsID", async (req, res) => {
   const {UserID} = req.body
       try {
      // Fetch all users
      const users = await db.UserDetails.findAll({where : {UserID}});
  
      // Respond with the list of users
      res.status(200).json({ data: users });
    } catch (err) {
      // Handle errors that occur during fetching
      console.error(err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });


module.exports = router; // Export the router to be used in other files
