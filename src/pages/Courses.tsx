import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import CourseCard from "../Components/CourseCard";
import { useNavigate } from "react-router-dom";

interface Course {
  courseCode: string;
  title: string;
  professor: string;
  college: string;
}

function Courses() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student") || "{}");
  const studentCollege = student?.college || "";

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://ldijnhtnswj3t5khnepzmott7q0thqfl.lambda-url.us-east-1.on.aws/");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();

    const saved = JSON.parse(localStorage.getItem("selectedCourses") || "[]");
    setSelectedCourses(saved);
  }, []);

  const filteredCourses = courses.filter(
    (course) => course.college === studentCollege
  );

  const toggleCourseSelection = (courseCode: string) => {
    let updated: string[];
    if (selectedCourses.includes(courseCode)) {
      updated = selectedCourses.filter((c) => c !== courseCode);
    } else {
      updated = [...selectedCourses, courseCode];
    }
    setSelectedCourses(updated);
    localStorage.setItem("selectedCourses", JSON.stringify(updated));
  };

  const handleContinue = () => {
    if (selectedCourses.length === 0) {
      alert("Please select at least one course.");
      return;
    }
    navigate("/professors");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0C2340",
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
        }}
      >
        Available Courses
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "40px",
        }}
      >
        {filteredCourses.map((course, index) => (
          <div
            key={index}
            onClick={() => toggleCourseSelection(course.courseCode)}
            style={{
              cursor: "pointer",
              border: selectedCourses.includes(course.courseCode)
                ? "2px solid #FFD700"
                : "2px solid transparent",
            }}
          >
            <CourseCard
              courseCode={course.courseCode}
              title={course.title}
              professor={course.professor}
            />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <button
          onClick={handleContinue}
          style={{
            padding: "1rem 2rem",
            fontWeight: "700",
            backgroundColor: "white",
            color: "#0C2340",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          Continue to Professors
        </button>
      </div>
    </div>
  );
}

export default Courses;