import React from "react";
import Navbar from "../Components/Navbar";

const colleges = [
  "School of Engineering",
  "School of Business",
  "College of Liberal Arts and Sciences",
];

function Colleges() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #0C2340, #1f4d7a)",
        textAlign: "center",
        paddingTop: "40px",
        fontFamily: "Times New Roman, serif",
        color: "white",
      }}
    >
      <Navbar />

      <h1
        style={{
          fontSize: "2.4rem",
          marginTop: "30px",
          marginBottom: "1rem",
          fontWeight: "800",
        }}
      >
        UConn Colleges
      </h1>

      <p
        style={{
          fontSize: "1rem",
          marginBottom: "2rem",
          opacity: 0.95,
        }}
      >
        Explore colleges connected to available courses and study groups.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          padding: "0 20px",
        }}
      >
        {colleges.map((college) => (
          <div
            key={college}
            style={{
              backgroundColor: "white",
              color: "#0C2340",
              width: "260px",
              padding: "1.2rem",
              borderRadius: "1rem",
              boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
              fontSize: "1.05rem",
              fontWeight: "700",
            }}
          >
            {college}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Colleges;