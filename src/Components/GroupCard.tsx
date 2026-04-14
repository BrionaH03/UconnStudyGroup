// src/components/GroupCard.tsx
import React from "react";

interface GroupCardProps {
  groupName: string;
  courseCode: string;
  professor: string;
  onJoin: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ groupName, courseCode, professor, onJoin }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "#0C2340",
        padding: "1rem",
        margin: "1rem",
        borderRadius: "0.5rem",
        width: "250px",
        textAlign: "center",
        fontFamily: "Times New Roman, serif",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      <h2 style={{ fontSize: "1.2rem", fontWeight: "700" }}>{groupName}</h2>
      <p>{courseCode}</p>
      <p>{professor}</p>
      <button
        onClick={onJoin}
        style={{
          marginTop: "10px",
          padding: "0.5rem 1rem",
          backgroundColor: "#0C2340",
          color: "white",
          fontWeight: "700",
          borderRadius: "0.3rem",
          cursor: "pointer",
        }}
      >
        Join
      </button>
    </div>
  );
};

export default GroupCard;