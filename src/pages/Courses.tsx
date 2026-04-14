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
        const response = await fetch(
          "https://ldijnhtnswj3t5khnepzmott7q0thqfl.lambda-url.us-east-1.on.aws/"
        );

        const data = await response.json();
        console.log("courses api response:", data);

        if (Array.isArray(data)) {
          setCourses(data);
        } else if (Array.isArray(data.body)) {
          setCourses(data.body);
        } else if (typeof data.body === "string") {
          const parsed = JSON.parse(data.body);
          setCourses(Array.isArray(parsed) ? parsed : []);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    };

    fetchCourses();

    const saved = JSON.parse(localStorage.getItem("selectedCourses") || "[]");
    setSelectedCourses(saved);
  }, []);

  const filteredCourses = Array.isArray(courses)
    ? courses.filter((course) => course.college === studentCollege)
    : [];

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
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div
              key={index}
              onClick={() => toggleCourseSelection(course.courseCode)}
              style={{
                cursor: "pointer",
                border: selectedCourses.includes(course.courseCode)
                  ? "2px solid #FFD700"
                  : "2px solid transparent",
                borderRadius: "18px",
              }}
            >
              <CourseCard
                courseCode={course.courseCode}
                title={course.title}
                professor={course.professor}
              />
            </div>
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
            No courses available yet for your selected college.
          </p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <button
          onClick={handleContinue}
          style={{
            padding: "1rem 2rem",
            fontWeight: "700",
            backgroundColor: "#FFD700",
            color: "#0C2340",
            borderRadius: "0.75rem",
            cursor: "pointer",
            border: "none",
          }}
        >
          Continue to Professors
        </button>
      </div>
    </div>
  );
}

export default Courses;