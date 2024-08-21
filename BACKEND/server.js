const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

//MiddleWare
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // Middleware to parse JSON bodies

const ProductRoutes = require("./routes/ProductRoutes");
const CategoryRoutes = require("./routes/CategoryRoutes");
const AuthRoutes = require("./routes/Auth");
const UserRoutes = require("./routes/UserRoutes")
const OrderRoutes = require("./routes/OrderRoutes");
const SearchRoutes = require("./routes/Search")

app.use("/product", ProductRoutes);
app.use("/category", CategoryRoutes);
app.use("/auth", AuthRoutes);
app.use("/orders", OrderRoutes);
app.use("/search", SearchRoutes);
app.use("/user", UserRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
