import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
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
        My Profile
      </h1>

      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          backgroundColor: "rgba(255,255,255,0.12)",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        {profile ? (
          <>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Student ID:</strong> {profile.studentId}</p>
            <p><strong>Year:</strong> {profile.year}</p>
            <p><strong>Major:</strong> {profile.major}</p>
            <p><strong>College:</strong> {profile.college}</p>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;