document.addEventListener("DOMContentLoaded", async function () {
  const orders = document.getElementById("orders");
  const token = localStorage.getItem("authToken");
  if (!token) {
    window.location.href("../HTML/Login.html");
    return;
  }
  let UserID;
  {
    try {
      // Fetch UserID using the token
      const response = await fetch("http://localhost:3000/auth/getUserID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }), // Send token as part of an object
      });

      // Check if the response was successful
      if (!response.ok) {
        throw new Error("Failed to fetch UserID");
      }

      // Parse the JSON response
      const result = await response.json(); // Await the JSON parsing

      // Extract UserID from the result
      UserID = result.UserID;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  console.log(UserID);
  {
    try {
      const response = await fetch("http://localhost:3000/orders/getOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserID }),
      });
      const result = await response.json();

      const data = result.data;
      data.forEach((obj) => {
        const isoDateString = obj.Date;

        // Create a Date object
        const date = new Date(isoDateString);
        const expiryDate = new Date(date); // Create a copy of the original date
        expiryDate.setUTCDate(date.getUTCDate() + 10); // Add 10 days
        // Options for formatting
        const options = {
          weekday: "short", // Short day name (Mon, Tue, etc.)
          day: "numeric", // Numeric day (27)
          month: "short", // Short month name (May, Jun, etc.)
        };

        // Format the date
        const formattedDate = date.toLocaleDateString("en-US", options);
        const expDate = expiryDate.toLocaleDateString("en-US", options);

        const card = `<div class="bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg">
      <div class="flex justify-between items-center mb-2">
          <div>
              <h2 class="text-xl font-semibold">FCUK</h2>
              <p class="text-gray-600">${obj.Details}</p>
              <p class="text-gray-500">Size: M</p>
          </div>
          <div class="text-right">
              <p class="text-green-500 font-semibold">${obj.Status}</p>
              <p class="text-gray-600">On ${formattedDate}</p>
          </div>
      </div>
      <div class="flex justify-between items-center">
          <div class="flex items-center space-x-1 text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 10h1l2 10h12l2-10h1m-17-4h18a2 2 0 012 2v2a2 2 0 01-2 2h-18a2 2 0 01-2-2v-2a2 2 0 012-2z">
                  </path>
              </svg>
              <p>Exchange/Return window closed on ${expDate}</p>
          </div>
      </div>
  </div>`;
        orders.insertAdjacentHTML("beforeend", card);
      });
    } catch (err) {
      console.log("error", err.message);
    }
  }
});
