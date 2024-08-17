// Wait for the HTML document to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    // Get references to the form and submit button elements
    const Form = document.getElementById('form');
    const SubmitButton = document.getElementById('SubmitButton');

    // Add an event listener to handle form submission
    Form.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Disable the submit button to prevent multiple submissions
        SubmitButton.disabled = true;
        // Call the function to handle user creation
        CreateUser();
    });
});

// Function to create a new user
async function CreateUser() {
    // Get the values from the form fields
    const FName = document.getElementById("fname").value;
    const LName = document.getElementById("lname").value;
    const DOB = document.getElementById("dob").value;
    const Contact = document.getElementById("contact").value;
    const Address = document.getElementById("address").value;
    const Email = document.getElementById("email").value;
    const Password = document.getElementById("password").value;

    // Create an object with the user data
    const UserData = {
        FName: FName,
        LName: LName,
        DOB: DOB,
        Contact: Contact,
        Address: Address,
        Email: Email,
        Password: Password
    };

    try {
        // Send the user data to the server
        const response = await fetch("http://localhost:3000/auth/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(UserData)
        });

        // Parse the response from the server
        const data = await response.json();

        // Check if the response indicates success
        if (response.ok) {
            // Show a success message
            alert("Account Created successfully!");
            window.location.replace("../HTML/Login")
            // Reset the form fields
            Form.reset();
        } else {
            // Handle different error status codes
            switch (response.status) {
                case 409:
                    alert("A user with this email already exists. Please use a different email address.");
                    break;
                case 500:
                    alert("An internal server error occurred. Please try again later.");
                    break;
                case 400:
                    alert("All fields are required. Please fill in all fields.");
                    break;
                default:
                    alert("An unexpected error occurred. Please try again.");
                    break;
            }
        }
    } catch (err) {
        // Log any errors that occur and show a generic error message
        console.error("Error:", err);
        alert("An unexpected error occurred. Please try again.");
    } finally {
        // Re-enable the submit button in both success and error cases
        SubmitButton.disabled = false;
    }
}


/*
TO BE DONE MORE
When email is not in correct form for example R@gmaiil.com it gives a 404 error 
Task -> Make this more specific so that user know that email is in wrong format 
*/