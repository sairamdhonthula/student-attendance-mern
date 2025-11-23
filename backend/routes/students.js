const express = require("express");
const Student = require("../models/Student");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const students = await Student.find({ teacher: req.user.id });
  res.json(students);
});

module.exports = router;
