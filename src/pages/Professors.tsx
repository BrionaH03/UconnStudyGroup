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
    {
      groupName: "Comp Arch Study Group",
      courseCode: "CSE 3666",
      professor: "Dr. Smith",
      college: "Engineering",
    },
    {
      groupName: "Algorithms Group",
      courseCode: "CSE 3500",
      professor: "Dr. Johnson",
      college: "Engineering",
    },
    {
      groupName: "Literature Reading Group",
      courseCode: "ENG 2000",
      professor: "Dr. Allen",
      college: "Liberal Arts",
    },
  ];

  const fakeCounts: Record<string, number> = {
    "Comp Arch Study Group": 5,
    "Algorithms Group": 8,
    "Literature Reading Group": 3,
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