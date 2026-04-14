import React from "react";
import Navbar from "../Components/Navbar";
import background from "../assets/background.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function Home() {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

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
              maxWidth: "850px",
              textAlign: "center",
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
              }}
            >
              Study smarter. Connect faster.
            </p>

            <h1
              style={{
                fontSize: "3.8rem",
                fontWeight: 800,
                marginBottom: "1rem",
                lineHeight: 1.1,
              }}
            >
              Welcome to UConn Study Groups
            </h1>

            <p
              style={{
                fontSize: "1.25rem",
                maxWidth: "680px",
                margin: "0 auto 2rem auto",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.95)",
              }}
            >
              Find classmates in your courses, join study groups, and build a
              better way to prepare for class, exams, and assignments together.
            </p>

            {isAuthenticated ? (
              <>
                <p
                  style={{
                    fontSize: "1.15rem",
                    marginBottom: "1.5rem",
                    fontWeight: 700,
                    color: "#FFD700",
                  }}
                >
                  Welcome back, {user?.name?.split(" ")[0]}.
                </p>

                <Link to="/courses">
                  <button
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
                    }}
                  >
                    Get Started
                  </button>
                </Link>
              </>
            ) : (
              <div>
                <p
                  style={{
                    fontSize: "1.05rem",
                    marginBottom: "1.5rem",
                    color: "rgba(255,255,255,0.95)",
                  }}
                >
                  Log in or sign up to start building your academic community.
                </p>

                <button
                  onClick={() => loginWithRedirect()}
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
                  }}
                >
                  Explore the Platform
                </button>
              </div>
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
        `}
      </style>
    </div>
  );
}

export default Home;