import React from "react";
import Navbar from "../Components/Navbar";
import { useParams, useNavigate } from "react-router-dom";

function CourseDetails() {
  const { courseCode } = useParams<{ courseCode: string }>();
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#0C2340", minHeight: "100vh", color: "white", fontFamily: "Times New Roman, serif" }}>
      <Navbar />

      <h1 style={{ textAlign: "center", marginTop: "80px", fontSize: "3rem" }}>
        {courseCode} Details
      </h1>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Details about {courseCode} will appear here.
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <button
          onClick={() => navigate("/signup")}
          style={{
            padding: "1rem 2rem",
            fontWeight: "700",
            backgroundColor: "white",
            color: "#0C2340",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontFamily: "Times New Roman, serif",
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default CourseDetails;