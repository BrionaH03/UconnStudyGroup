// src/pages/Professors.tsx
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

  const selectedCourses: string[] = JSON.parse(localStorage.getItem("selectedCourses") || "[]");

  const groups: Group[] = [
    { groupName: "Comp Arch Study Group", courseCode: "CSE 3666", professor: "Dr. Smith", college: "Engineering" },
    { groupName: "Algorithms Group", courseCode: "CSE 3500", professor: "Dr. Johnson", college: "Engineering" },
    { groupName: "Literature Reading Group", courseCode: "ENG 2000", professor: "Dr. Allen", college: "Liberal Arts" },
  ];

  // Filter by student college AND selected courses
  const filteredGroups = groups.filter(
    group => group.college === studentCollege && selectedCourses.includes(group.courseCode)
  );

  const handleJoin = (groupName: string) => {
    alert(`You joined ${groupName}`);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0C2340", fontFamily: "Times New Roman, serif" }}>
      <Navbar />

      <h1 style={{ textAlign: "center", color: "white", marginTop: "60px", fontSize: "3rem" }}>
        Professors & Groups
      </h1>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "40px" }}>
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group, index) => (
            <GroupCard
              key={index}
              groupName={group.groupName}
              courseCode={group.courseCode}
              professor={group.professor}
              onJoin={() => handleJoin(group.groupName)}
            />
          ))
        ) : (
          <p style={{ color: "white", textAlign: "center", width: "100%", marginTop: "40px" }}>
            No groups available for your selected courses.
          </p>
        )}
      </div>
    </div>
  );
}

export default Professors;