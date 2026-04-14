import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import background from "../assets/background.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import { getProfile } from "../utils/getProfile";

function Profile() {
  const { user } = useAuth0();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (user?.sub) {
        const data = await getProfile(user.sub);
        setProfile(data);
      }
    };

    loadProfile();
  }, [user]);

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
              textAlign: "left",
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
              Your account
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
              My Profile
            </h1>

            {profile ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.14)",
                    padding: "1rem",
                    borderRadius: "16px",
                  }}
                >
                  <p style={{ margin: 0, color: "#FFD700", fontWeight: 700 }}>
                    Name
                  </p>
                  <p style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
                    {profile.name}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.14)",
                    padding: "1rem",
                    borderRadius: "16px",
                  }}
                >
                  <p style={{ margin: 0, color: "#FFD700", fontWeight: 700 }}>
                    Email
                  </p>
                  <p style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
                    {profile.email}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.14)",
                    padding: "1rem",
                    borderRadius: "16px",
                  }}
                >
                  <p style={{ margin: 0, color: "#FFD700", fontWeight: 700 }}>
                    Student ID
                  </p>
                  <p style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
                    {profile.studentId}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.14)",
                    padding: "1rem",
                    borderRadius: "16px",
                  }}
                >
                  <p style={{ margin: 0, color: "#FFD700", fontWeight: 700 }}>
                    Year
                  </p>
                  <p style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
                    {profile.year}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.14)",
                    padding: "1rem",
                    borderRadius: "16px",
                  }}
                >
                  <p style={{ margin: 0, color: "#FFD700", fontWeight: 700 }}>
                    Major
                  </p>
                  <p style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
                    {profile.major}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.14)",
                    padding: "1rem",
                    borderRadius: "16px",
                  }}
                >
                  <p style={{ margin: 0, color: "#FFD700", fontWeight: 700 }}>
                    College
                  </p>
                  <p style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
                    {profile.college}
                  </p>
                </div>
              </div>
            ) : (
              <p style={{ textAlign: "center", fontSize: "1.1rem" }}>
                Loading profile...
              </p>
            )}
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

          @media (max-width: 700px) {
            .profile-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Profile;