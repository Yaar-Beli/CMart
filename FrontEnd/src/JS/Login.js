document.addEventListener("DOMContentLoaded", function() {
    const Form = document.getElementById('form');
    const SubmitButton = document.getElementById('SubmitButton');

    // Add an event listener to handle form submission
    Form.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Disable the submit button to prevent multiple submissions
        SubmitButton.disabled = true;
        // Call the function to handle user creation
        VerifyUser(Form, SubmitButton);
    });
});

async function VerifyUser(Form, SubmitButton) {
    const Email = document.getElementById('email').value;
    const Password = document.getElementById('password').value;

    const LoginCredentials = {
        Email: Email,
        Password: Password
    };

    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(LoginCredentials)   
        });

        const data = await response.json();

        if (response.ok) {
            const token = data.token;
            console.log("Token:", token);

            // Example: Store the token in localStorage
            localStorage.setItem('authToken', token);

            window.location.replace("./HomePage.html")

            // Reset the form and re-enable the submit button
            Form.reset();
            SubmitButton.disabled = false;

            // You might want to redirect the user or show a success message
            alert("Login successful!");
        } else {
            // Handle specific error messages based on the response status
            switch (response.status) {
                case 401:
                    alert("Invalid credentials. Please try again.");
                    break;
                case 500:
                    alert("An internal server error occurred. Please try again later.");
                    break;
                default:
                    alert("An unexpected error occurred. Please try again.");
                    break;
            }
            // Re-enable the submit button
            SubmitButton.disabled = false;
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
        // Re-enable the submit button
        SubmitButton.disabled = false;
    }
}
