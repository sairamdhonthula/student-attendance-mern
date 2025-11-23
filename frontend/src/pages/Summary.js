import React, { useEffect, useState } from "react";
import { getSummary } from "../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Summary() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getSummary(token).then(raw => {
      const formatted = raw.map(item => ({
        name: item.name,
        percentage: ((item.present / item.total) * 100).toFixed(1)
      }));
      setData(formatted);
    });
  }, [token]);

  return (
    <div style={{ padding: 40 }}>
      <h2>📊 Attendance Summary</h2>

      <button onClick={() => window.location.href = "/dashboard"}>
        ⬅ Back to Dashboard
      </button>

      <BarChart width={700} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="percentage" fill="#3f51b5" />
      </BarChart>
    </div>
  );
}

export default Summary;
