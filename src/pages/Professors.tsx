import React from "react";
import Navbar from "../Components/Navbar";
import GroupCard from "../Components/GroupCard";

interface Group {
  groupName: string;
  courseCode: string;
  professor: string;
  college: string;
}

function Professors() {
  const student = JSON.parse(localStorage.getItem("student") || "{}");
  const studentCollege = student?.college || "";

  const selectedCourses: string[] = JSON.parse(
    localStorage.getItem("selectedCourses") || "[]"
  );

  const groups: Group[] = [
    { groupName: "Comp Arch Study Group", courseCode: "CSE 3666", professor: "Dr. Smith", college: "Engineering" },
    { groupName: "Algorithms Group", courseCode: "CSE 3500", professor: "Dr. Johnson", college: "Engineering" },
    { groupName: "Circuits Review Group", courseCode: "ECE 2001", professor: "Dr. Patel", college: "Engineering" },
    { groupName: "Thermo Problem Solvers", courseCode: "ME 2233", professor: "Dr. Nguyen", college: "Engineering" },

    { groupName: "Literature Reading Group", courseCode: "ENG 2000", professor: "Dr. Allen", college: "Liberal Arts" },
    { groupName: "History Discussion Circle", courseCode: "HIST 1501", professor: "Dr. Carter", college: "Liberal Arts" },
    { groupName: "Psych Study Buddies", courseCode: "PSYC 1100", professor: "Dr. Rivera", college: "Liberal Arts" },
    { groupName: "Sociology Connect", courseCode: "SOCI 1001", professor: "Dr. Brooks", college: "Liberal Arts" },

    { groupName: "Finance Prep Group", courseCode: "FNCE 3101", professor: "Dr. Walker", college: "Business" },
    { groupName: "Marketing Brainstorm Team", courseCode: "MKTG 3260", professor: "Dr. Adams", college: "Business" },
    { groupName: "OPIM Tech Group", courseCode: "OPIM 3103", professor: "Dr. Lee", college: "Business" },
    { groupName: "Leadership Workshop Group", courseCode: "MGMT 3101", professor: "Dr. Harris", college: "Business" },
  ];

  const fakeCounts: Record<string, number> = {
    "Comp Arch Study Group": 5,
    "Algorithms Group": 8,
    "Circuits Review Group": 6,
    "Thermo Problem Solvers": 4,

    "Literature Reading Group": 3,
    "History Discussion Circle": 7,
    "Psych Study Buddies": 9,
    "Sociology Connect": 5,

    "Finance Prep Group": 6,
    "Marketing Brainstorm Team": 10,
    "OPIM Tech Group": 7,
    "Leadership Workshop Group": 4,
  };

  const filteredGroups = groups.filter(
    (group) =>
      group.college === studentCollege &&
      selectedCourses.includes(group.courseCode)
  );

  const handleJoin = (group: Group) => {
    const existingGroups: Group[] = JSON.parse(
      localStorage.getItem("joinedGroups") || "[]"
    );

    const alreadyJoined = existingGroups.some(
      (g) => g.groupName === group.groupName
    );

    if (alreadyJoined) {
      alert(`You already joined ${group.groupName}`);
      return;
    }

    const updatedGroups = [...existingGroups, group];
    localStorage.setItem("joinedGroups", JSON.stringify(updatedGroups));
    alert(`You joined ${group.groupName}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #0C2340, #1f4d7a)",
        fontFamily: "Times New Roman, serif",
      }}
    >
      <Navbar />

      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginTop: "60px",
          fontSize: "3rem",
          fontWeight: "800",
        }}
      >
        Professors & Groups
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "40px",
        }}
      >
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group, index) => (
            <GroupCard
              key={index}
              groupName={group.groupName}
              courseCode={group.courseCode}
              professor={group.professor}
              memberCount={fakeCounts[group.groupName]}
              onJoin={() => handleJoin(group)}
            />
          ))
        ) : (
          <p
            style={{
              color: "white",
              textAlign: "center",
              width: "100%",
              marginTop: "40px",
              fontSize: "1.1rem",
            }}
          >
            No groups available for your selected courses.
          </p>
        )}
      </div>
    </div>
  );
}

export default Professors;