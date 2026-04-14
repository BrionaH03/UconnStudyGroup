import React, { useState } from "react";

type CourseProps = {
  courseCode: string;
  title: string;
  professor: string;
};

function CourseCard({ courseCode, title, professor }: CourseProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "white",
        color: "#0C2340",
        padding: "24px",
        borderRadius: "16px",
        width: "300px",
        margin: "20px",
        boxShadow: hovered
          ? "0 10px 24px rgba(0,0,0,0.28)"
          : "0 4px 10px rgba(0,0,0,0.2)",
        fontFamily: "Times New Roman, serif",
        transform: hovered ? "translateY(-6px)" : "translateY(0px)",
        transition: "all 0.25s ease",
      }}
    >
      <h2
        style={{
          marginBottom: "12px",
          fontSize: "1.4rem",
          color: "#0C2340",
        }}
      >
        {courseCode}
      </h2>

      <p
        style={{
          marginBottom: "10px",
          fontSize: "1.05rem",
          fontWeight: "600",
        }}
      >
        {title}
      </p>

      <p style={{ color: "#345", margin: 0 }}>
        Professor: {professor}
      </p>
    </div>
  );
}

export default CourseCard;