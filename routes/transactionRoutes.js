const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction");

// ➕ Add Transaction
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { type, amount, category, description } = req.body;

    const transaction = new Transaction({
      user: req.user.id,
      type,
      amount,
      category,
      description,
    });

    await transaction.save();

    res.json({ message: "Transaction added", transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📥 Get All Transactions
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔍 FILTER ROUTE (ADD THIS)
router.get("/filter", authMiddleware, async (req, res) => {
  try {
    const { category, type, startDate, endDate } = req.query;

    let query = { user: req.user.id };

    if (category) query.category = category;
    if (type) query.type = type;

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(query);

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;