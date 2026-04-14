import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { getProfile } from "../utils/getProfile";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const [studentId, setStudentId] = useState("");
  const [college, setCollege] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      if (user?.sub) {
        const profile = await getProfile(user.sub);
        if (profile) {
          setYear(profile.year || "");
          setMajor(profile.major || "");
          setStudentId(profile.studentId || "");
          setCollege(profile.college || "");
        }
      }
    };

    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        "https://7vfol2gwlgteqxdkgftwqprmne0rmwcl.lambda-url.us-east-1.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth0Id: user.sub || "",
            name: user.name || "",
            email: user.email || "",
            studentId,
            year,
            major,
            college,
            profileComplete: true,
          }),
        }
      );

      if (!response.ok) {
        alert("Failed to update settings.");
        return;
      }

      alert("Profile updated!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #0C2340, #1f4d7a)",
        color: "white",
        fontFamily: "Times New Roman, serif",
      }}
    >
      <Navbar />

      <h1
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontSize: "3rem",
          fontWeight: "800",
        }}
      >
        Settings
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
          gap: "15px",
        }}
      >
        <input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: "12px", borderRadius: "8px", width: "280px" }}
        />
        <input
          placeholder="Major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          style={{ padding: "12px", borderRadius: "8px", width: "280px" }}
        />
        <input
          placeholder="Student PeopleSoft ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ padding: "12px", borderRadius: "8px", width: "280px" }}
        />
        <select
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          style={{ padding: "12px", borderRadius: "8px", width: "305px" }}
        >
          <option value="">Select College</option>
          <option value="Engineering">Engineering</option>
          <option value="Liberal Arts">Liberal Arts</option>
          <option value="Business">Business</option>
        </select>

        <button
          onClick={handleSave}
          style={{
            padding: "1rem 2rem",
            fontWeight: "700",
            backgroundColor: "#FFD700",
            color: "#0C2340",
            borderRadius: "0.5rem",
            cursor: "pointer",
            border: "none",
            marginTop: "10px",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;