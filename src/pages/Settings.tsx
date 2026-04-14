import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import background from "../assets/background.jpg";
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

      localStorage.setItem(
        "student",
        JSON.stringify({
          auth0Id: user.sub || "",
          name: user.name || "",
          email: user.email || "",
          studentId,
          year,
          major,
          college,
          profileComplete: true,
        })
      );

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
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        fontFamily: "Times New Roman, serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom right, rgba(12,35,64,0.78), rgba(12,35,64,0.55), rgba(0,0,0,0.58))",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <Navbar />

        <div
          style={{
            minHeight: "calc(100vh - 90px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: "24px",
              padding: "3rem 2rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              animation: "fadeInUp 1s ease",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#FFD700",
                marginBottom: "1rem",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Update your information
            </p>

            <h1
              style={{
                fontSize: "3.3rem",
                fontWeight: 800,
                marginBottom: "2rem",
                textAlign: "center",
                lineHeight: 1.1,
              }}
            >
              Settings
            </h1>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxWidth: "420px",
                margin: "0 auto",
              }}
            >
              <input
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "1rem",
                }}
              />

              <input
                placeholder="Major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "1rem",
                }}
              />

              <input
                placeholder="Student PeopleSoft ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "1rem",
                }}
              />

              <select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "1rem",
                }}
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
                  fontSize: "1rem",
                  fontWeight: 700,
                  backgroundColor: "#FFD700",
                  color: "#0C2340",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
                  marginTop: "0.5rem",
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Settings;