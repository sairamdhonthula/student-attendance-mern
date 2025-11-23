const express = require("express");
const Attendance = require("../models/Attendance");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { date, records } = req.body;

  await Attendance.deleteMany({
    teacher: req.user.id,
    date: new Date(date),
  });

  for (let r of records) {
    await Attendance.create({
      date,
      teacher: req.user.id,
      student: r.studentId,
      status: r.status,
    });
  }

  res.json({ message: "Attendance saved" });
});

router.get("/summary", auth, async (req, res) => {
  const data = await Attendance.find({ teacher: req.user.id }).populate("student");

  const summary = {};

  data.forEach(entry => {
    const id = entry.student._id.toString();
    if (!summary[id]) {
      summary[id] = {
        name: entry.student.name,
        total: 0,
        present: 0
      };
    }
    summary[id].total++;
    if (entry.status === "Present") summary[id].present++;
  });

  res.json(Object.values(summary));
});

module.exports = router;
