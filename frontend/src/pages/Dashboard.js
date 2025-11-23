import React, { useEffect, useState } from "react";
import { getStudents, submitAttendance } from "../services/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    getStudents(token).then(data => {
      setStudents(data);
      const initial = {};
      data.forEach(s => initial[s._id] = "Present");
      setAttendance(initial);
    });
  }, [token]);

  const toggle = (id) => {
    setAttendance({
      ...attendance,
      [id]: attendance[id] === "Present" ? "Absent" : "Present"
    });
  };

  const submit = () => {
    const records = students.map(s => ({
      studentId: s._id,
      status: attendance[s._id]
    }));

    submitAttendance(token, {
      date: new Date(),
      records
    });

    alert("Attendance Submitted!");
  };

  // ✅ EXCEL EXPORT FUNCTION (CORRECT PLACE)
  const exportToExcel = () => {
    const sheetData = students.map(s => ({
      Name: s.name,
      Status: attendance[s._id]
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    saveAs(file, "Attendance_Report.xlsx");
  };

  return (
    <div style={{
      padding: "40px",
      fontFamily: "Arial",
      background: "#f4f6f8",
      minHeight: "100vh"
    }}>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2>📋 Attendance Dashboard</h2>

        <div>
          <button
            style={{ marginRight: 10 }}
            onClick={() => window.location.href = "/summary"}
          >
            📊 View Summary
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "30px"
      }}>
        {students.map(s => (
          <div key={s._id} style={{
            background: "#fff",
            padding: 20,
            borderRadius: 10,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
          }}>

            <h3>{s.name}</h3>
            <p>Status: <strong>{attendance[s._id]}</strong></p>

            <button
              style={{
                background: attendance[s._id] === "Present" ? "#4CAF50" : "#f44336",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: 5
              }}
              onClick={() => toggle(s._id)}
            >
              Toggle
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 30 }}>
        <button
          style={{
            background: "#2196F3",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            marginRight: "10px"
          }}
          onClick={submit}
        >
          ✅ Submit Attendance
        </button>

        <button
          style={{
            background: "#673AB7",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px"
          }}
          onClick={exportToExcel}
        >
          📥 Export to Excel
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
