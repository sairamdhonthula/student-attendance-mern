const express = require("express");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const teacher = await Teacher.findOne({ email });
  if (!teacher || teacher.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: teacher._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    teacher: {
      id: teacher._id,
      name: teacher.name,
      email: teacher.email,
    },
  });
});

module.exports = router;
