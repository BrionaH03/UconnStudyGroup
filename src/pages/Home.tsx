import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { getProfile } from "../utils/getProfile";

function Home() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [profileComplete, setProfileComplete] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      if (!isAuthenticated || !user?.sub) {
        setProfileComplete(false);
        setCheckingProfile(false);
        return;
      }

      const profile = await getProfile(user.sub);
      setProfileComplete(profile?.profileComplete === true);
      setCheckingProfile(false);
    };

    if (!isLoading) {
      checkProfile();
    }
  }, [isAuthenticated, user, isLoading]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(to bottom right, #0C2340, #1f4d7a, #4b6fa5)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Times New Roman, serif",
      }}
    >
      <Navbar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(8px)",
            padding: "3rem 2rem",
            borderRadius: "1rem",
            maxWidth: "800px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "4rem",
              fontWeight: "800",
              marginBottom: "1rem",
            }}
          >
            Find Your Study Group at UConn
          </h1>

          <p
            style={{
              color: "white",
              fontSize: "1.2rem",
              lineHeight: "1.8",
              marginBottom: "2rem",
            }}
          >
            Connect with classmates, explore courses, and join study groups
            tailored to your college and classes.
          </p>

          {!isAuthenticated ? (
            <p
              style={{
                color: "white",
                fontSize: "1rem",
                opacity: 0.95,
              }}
            >
              Log in or sign up to get started.
            </p>
          ) : checkingProfile ? (
            <p style={{ color: "#FFD700", fontWeight: "700" }}>
              Loading your profile...
            </p>
          ) : profileComplete ? (
            <>
              <p
                style={{
                  color: "#FFD700",
                  fontWeight: "700",
                  fontSize: "1.2rem",
                  marginBottom: "1.5rem",
                }}
              >
                Welcome back, {user?.name?.split(" ")[0]}.
              </p>

              <Link to="/courses">
                <button
                  style={{
                    padding: "1rem 2rem",
                    fontWeight: "700",
                    backgroundColor: "#FFD700",
                    color: "#0C2340",
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    border: "none",
                    fontSize: "1rem",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  Go to Courses
                </button>
              </Link>
            </>
          ) : (
            <>
              <p
                style={{
                  color: "#FFD700",
                  fontWeight: "700",
                  fontSize: "1.2rem",
                  marginBottom: "1.5rem",
                }}
              >
                Welcome, {user?.name?.split(" ")[0]}. Finish your signup to continue.
              </p>

              <Link to="/signup">
                <button
                  style={{
                    padding: "1rem 2rem",
                    fontWeight: "700",
                    backgroundColor: "#FFD700",
                    color: "#0C2340",
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    border: "none",
                    fontSize: "1rem",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  Complete Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;