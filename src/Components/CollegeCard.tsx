import React from "react";

type CollegeProps = {
  name: string;
};

function CollegeCard({ name }: CollegeProps) {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "#0C2340",
        padding: "20px",
        borderRadius: "10px",
        width: "250px",
        margin: "20px",
        textAlign: "center",
        fontFamily: "Times New Roman, serif",
      }}
    >
      <h2>{name}</h2>
    </div>
  );
}

export default CollegeCard;