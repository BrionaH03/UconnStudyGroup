import React, { useState } from "react";

interface GroupCardProps {
  groupName: string;
  courseCode: string;
  professor: string;
  memberCount?: number;
  onJoin: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({
  groupName,
  courseCode,
  professor,
  memberCount,
  onJoin,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "white",
        color: "#0C2340",
        padding: "1.25rem",
        margin: "1rem",
        borderRadius: "1rem",
        width: "260px",
        textAlign: "center",
        fontFamily: "Times New Roman, serif",
        boxShadow: hovered
          ? "0 10px 24px rgba(0,0,0,0.28)"
          : "0 2px 6px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-6px)" : "translateY(0px)",
        transition: "all 0.25s ease",
      }}
    >
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: "700",
          marginBottom: "0.75rem",
        }}
      >
        {groupName}
      </h2>

      <p style={{ marginBottom: "0.4rem", fontWeight: "600" }}>{courseCode}</p>
      <p style={{ marginBottom: "0.6rem", color: "#345" }}>{professor}</p>

      <p
        style={{
          marginBottom: "1rem",
          color: "#0C2340",
          fontWeight: "700",
        }}
      >
        Members: {memberCount ?? 0}
      </p>

      <button
        onClick={onJoin}
        style={{
          marginTop: "10px",
          padding: "0.7rem 1.2rem",
          backgroundColor: "#FFD700",
          color: "#0C2340",
          fontWeight: "700",
          borderRadius: "0.5rem",
          cursor: "pointer",
          border: "none",
        }}
      >
        Join Group
      </button>
    </div>
  );
};

export default GroupCard;