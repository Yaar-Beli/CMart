const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("../models");
const router = express.Router();

router.use(cors());
router.use(morgan("dev"));
router.use(express.json());

router.post("/GetOrders", async (req, res) => {
  try {
    const { UserID } = req.body;
    const response = await db.Order.findAll({ where: { UserID: UserID } });
    console.log(response);
    res.json({ data: response });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
