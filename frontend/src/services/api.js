const API_URL = "http://localhost:5000/api";

// LOGIN
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

// GET STUDENTS
export const getStudents = async (token) => {
  const res = await fetch(`${API_URL}/students`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

// SUBMIT ATTENDANCE
export const submitAttendance = async (token, data) => {
  const res = await fetch(`${API_URL}/attendance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

// SUMMARY
export const getSummary = async (token) => {
  const res = await fetch(`${API_URL}/attendance/summary`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};
