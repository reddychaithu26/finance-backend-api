const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1️⃣ Get Authorization header
    const authHeader = req.headers.authorization;

    // 2️⃣ Check if header exists
    if (!authHeader) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // 3️⃣ Extract token (remove "Bearer ")
    const token = authHeader.split(" ")[1];

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, "secretkey");

    // 5️⃣ Attach user data to request
    req.user = decoded;

    // 6️⃣ Continue to next middleware
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;