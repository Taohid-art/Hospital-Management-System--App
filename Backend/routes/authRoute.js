// routes/authRoute.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/me", (req, res) => {
  const token = req.cookies.token; // read cookie
  if (!token) return res.status(401).json({ admin: false });

  try {
    const decoded = jwt.verify(token, "my-secret-key"); // same secret
    res.json({ admin: decoded.admin || false, user: decoded });
  } catch {
    res.status(401).json({ admin: false });
  }
});

module.exports = router;
