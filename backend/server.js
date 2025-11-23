const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import Models
const Teacher = require("./models/Teacher");
const Student = require("./models/Student");

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/students", require("./routes/students"));
app.use("/api/attendance", require("./routes/attendance"));

app.get("/", (req, res) => {
  res.send("✅ Attendance API Running");
});

// MongoDB Connection + Seeding
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    // ---------- SEED DEFAULT TEACHER ----------
    const teacherExists = await Teacher.findOne({ email: "teacher@example.com" });

    if (!teacherExists) {
      await Teacher.create({
        email: "teacher@example.com",
        password: "password123"
      });
      console.log("✅ Default teacher created");
    } else {
      console.log("✅ Default teacher already exists");
    }

    // ---------- SEED STUDENTS ----------
    const studentCount = await Student.countDocuments();

    if (studentCount === 0) {
      await Student.insertMany([
        { name: "Alice" },
        { name: "Bob" },
        { name: "Charlie" }
      ]);
      console.log("✅ Students seeded");
    } else {
      console.log("✅ Students already exist");
    }

  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});