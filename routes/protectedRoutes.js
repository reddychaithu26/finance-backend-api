const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Only admin can access
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({ message: "Welcome Admin 🔥" });
  }
);

// Admin + Analyst
router.get(
  "/analytics",
  authMiddleware,
  roleMiddleware(["admin", "analyst"]),
  (req, res) => {
    res.json({ message: "Analytics data 📊" });
  }
);

module.exports = router;