import React from "react";

type CourseProps = {
  courseCode: string;
  title: string;
  professor: string;
};

function CourseCard({ courseCode, title, professor }: CourseProps) {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "#0C2340",
        padding: "20px",
        borderRadius: "10px",
        width: "300px",
        margin: "20px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        fontFamily: "Times New Roman, serif",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>{courseCode}</h2>
      <p style={{ marginBottom: "8px" }}>{title}</p>
      <p>Professor: {professor}</p>
    </div>
  );
}

export default CourseCard;