document.addEventListener("DOMContentLoaded", function() {
    VerifyUser(); // Check the token when the homepage loads
});

async function VerifyUser() {
    const Token = localStorage.getItem('authToken');

    // If there's no token, redirect to the login page
    // if (!Token) {
    //     window.location.replace("../HTML/Login.html");
    //     return;
    // }

    try {
        // Decode the token
        const decodedToken = jwt_decode(Token);

        // Get the current time in seconds since the epoch
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
            // Token has expired, remove it from localStorage and redirect to login
            localStorage.removeItem('authToken');
            alert("Session has expired. Please log in again.");
           // window.location.replace("../HTML/Login.html");
        } else {
            console.log("Token is valid, user can stay on the homepage");
            // You can perform any additional actions here if needed
        }
    } catch (error) {
        console.error("Error decoding token or invalid token:", error);
        localStorage.removeItem('authToken');
       // window.location.replace("../HTML/Login.html");
    }
}


//module.exports = { VerifyUser };