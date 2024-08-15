// document.addEventListener("DOMContentLoaded", function(event){

//     //event.preventDefault(); // Prevent the default anchor behavior if needed
//     LogOut();

// });

function LogOut()
{
    localStorage.removeItem('authToken');
    window.location.replace("../HTML/Login.html")
}

