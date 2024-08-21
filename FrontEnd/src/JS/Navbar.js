// navbar.js
//const { verify } = require("jsonwebtoken");
//const VerifyUser = require("./Verify")
document.addEventListener("DOMContentLoaded", function (event) {

    // CheckLogin()
    // if (VerifyUser()) {
    //     logoutButton.innerHTML = "Login";
    //     logoutButton.onclick = function () {
    //         window.location.replace("../HTML/Login.html");
    //     };
    // } else {
    //     logoutButton.innerHTML = "Logout";
    //     logoutButton.onclick = function () {
    //         LogOut();
    //     };

    // }
    // Check login status on page load

    console.log("Fetch USerDetails ")
    fetchUserDetails()
});

function CheckLogin() {
    const AuthToken = localStorage.getItem("authToken");
    const logoutButton = document.getElementById("logout");

    if (!AuthToken) {
        logoutButton.innerHTML = "Login";
        logoutButton.onclick = function () {
            window.location.replace("../HTML/Login.html");
        };
    } else {
        logoutButton.innerHTML = "Logout";
        logoutButton.onclick = function () {
            LogOut();
        };
    }
}

function LogOut() {
    localStorage.removeItem('authToken');
    // document.getElementById("logout").innerHTML = "Login";
    // document.getElementById("logout").onclick = function() {
    window.location.replace("../HTML/Login.html");

    //window.location.reload()

}

// fetch user Name and email to display welcome message on navbar
async function fetchUserDetails() {
    try {
        const Token = localStorage.getItem("authToken")
        console.log("Token for fetch User detials: " + Token)

        const UserIdResponse = await fetch("http://localhost:3000/auth/getUserID", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: Token })
        });


        const userIdData = await UserIdResponse.json();
        const UserID = userIdData.UserID;
        console.log("User ID through token: " + UserID)

        const EmailResponse = await fetch("http://localhost:3000/user/fetchUsersLoginID", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ UserID: UserID })
        });

        const EmailData = await EmailResponse.json();
        const Email = EmailData.data[0].Email;

        console.log("EMail from Email response: " + Email)

        const NameResponse = await fetch("http://localhost:3000/user/fetchUsersDetailsID", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ UserID: UserID })
        });

        const NameData = await NameResponse.json();
        const FName = NameData.data[0].FName;
        const LName = NameData.data[0].LName;

        console.log("Fname " + FName + " " + "LName: " + LName)

        const welcomeDetails = document.getElementById("welcomeDetails")
        welcomeDetails.innerHTML = `
            <div class="block px-2 py-1 text-black font-semibold">
                ${FName} ${LName}
            </div>
            <div class="block px-2 py-1 text-gray-600 text-sm">
                ${Email}
            </div>
        `;
    }catch(err){

    }
}

function showDropdown() {
    document.getElementById('dropdownContent').classList.remove('hidden');
}

function hideDropdown() {
    document.getElementById('dropdownContent').classList.add('hidden');
}
