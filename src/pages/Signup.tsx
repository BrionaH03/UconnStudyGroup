import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const [studentId, setStudentId] = useState("");
  const [college, setCollege] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://7vfol2gwlgteqxdkgftwqprmne0rmwcl.lambda-url.us-east-1.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId,
            year,
            major,
            college,
          }),
        }
      );

      const text = await response.text();
      console.log("status:", response.status);
      console.log("raw response:", text);

      if (!response.ok) {
        alert("Failed to save student profile.");
        return;
      }
      localStorage.setItem("student", JSON.stringify({ year, major, studentId, college }));
      navigate("/courses");
    } catch (error) {
      console.error("REAL fetch error:", error);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0C2340",
        color: "white",
        fontFamily: "Times New Roman, serif",
      }}
    >
      <Navbar />

      <h1 style={{ textAlign: "center", marginTop: "60px", fontSize: "3rem" }}>
        Sign Up
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
          gap: "15px",
        }}
      >
        <input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px" }}
        />
        <input
          placeholder="Major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px" }}
        />
        <input
          placeholder="Student PeopleSoft ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px" }}
        />
        <select
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px" }}
        >
          <option value="">Select College</option>
          <option value="Engineering">Engineering</option>
          <option value="Liberal Arts">Liberal Arts</option>
          <option value="Business">Business</option>
        </select>

        <button
          onClick={handleSubmit}
          style={{
            padding: "1rem 2rem",
            fontWeight: "700",
            backgroundColor: "white",
            color: "#0C2340",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          Continue to Courses
        </button>
      </div>
    </div>
  );
}

export default Signup;