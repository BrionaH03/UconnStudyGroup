import React, { useMemo, useState } from "react";
import Navbar from "../Components/Navbar";

interface Group {
  groupName: string;
  courseCode: string;
  professor: string;
  college?: string;
}

interface ChatMessage {
  name: string;
  message: string;
  time: string;
}

const defaultMockChats: Record<string, ChatMessage[]> = {
  "Comp Arch Study Group": [
    {
      name: "Maya",
      message: "Did anyone understand the cache problem from class?",
      time: "6:42 PM",
    },
    {
      name: "Jordan",
      message: "Yeah, I can explain it before the quiz tomorrow.",
      time: "6:45 PM",
    },
    {
      name: "Chris",
      message: "I made a small review sheet if you all want it.",
      time: "6:48 PM",
    },
  ],
  "Algorithms Group": [
    {
      name: "Nia",
      message: "Are we meeting tonight to go over dynamic programming?",
      time: "5:10 PM",
    },
    {
      name: "Ethan",
      message: "Yes, I’ll be in the library around 7.",
      time: "5:13 PM",
    },
    {
      name: "Sofia",
      message: "Can someone also explain greedy vs DP one more time?",
      time: "5:15 PM",
    },
  ],
  "Literature Reading Group": [
    {
      name: "Ava",
      message: "I finished the reading and highlighted the main themes.",
      time: "7:02 PM",
    },
    {
      name: "Leo",
      message: "Same, I think the symbolism is going to come up in discussion.",
      time: "7:06 PM",
    },
    {
      name: "Grace",
      message: "I can bring my notes to the next meeting.",
      time: "7:08 PM",
    },
  ],
};

function JoinedGroups() {
  const [joinedGroups, setJoinedGroups] = useState<Group[]>(
    JSON.parse(localStorage.getItem("joinedGroups") || "[]")
  );

  const initialChats = useMemo(() => {
    const savedChats = JSON.parse(localStorage.getItem("groupChats") || "{}");
    return Object.keys(savedChats).length > 0 ? savedChats : defaultMockChats;
  }, []);

  const [groupChats, setGroupChats] = useState<Record<string, ChatMessage[]>>(
    initialChats
  );
  const [draftMessages, setDraftMessages] = useState<Record<string, string>>({});

  const handleDraftChange = (groupName: string, value: string) => {
    setDraftMessages((prev) => ({
      ...prev,
      [groupName]: value,
    }));
  };

  const handleSendMessage = (groupName: string) => {
    const newMessage = draftMessages[groupName]?.trim();

    if (!newMessage) return;

    const updatedChats = {
      ...groupChats,
      [groupName]: [
        ...(groupChats[groupName] || []),
        {
          name: "You",
          message: newMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        },
      ],
    };

    setGroupChats(updatedChats);
    localStorage.setItem("groupChats", JSON.stringify(updatedChats));

    setDraftMessages((prev) => ({
      ...prev,
      [groupName]: "",
    }));
  };

  const handleLeave = (groupName: string) => {
    const updatedGroups = joinedGroups.filter((g) => g.groupName !== groupName);
    setJoinedGroups(updatedGroups);
    localStorage.setItem("joinedGroups", JSON.stringify(updatedGroups));
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
        Joined Groups
      </h1>

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "0 20px 40px 20px",
        }}
      >
        {joinedGroups.length === 0 ? (
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              padding: "2rem",
              borderRadius: "1rem",
              textAlign: "center",
            }}
          >
            <p>You have not joined any groups yet.</p>
          </div>
        ) : (
          joinedGroups.map((group, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                borderRadius: "1rem",
                padding: "1.5rem",
                marginBottom: "2rem",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                      color: "#FFD700",
                    }}
                  >
                    {group.groupName}
                  </h2>

                  <p style={{ marginBottom: "0.3rem" }}>
                    <strong>Course:</strong> {group.courseCode}
                  </p>
                  <p style={{ marginBottom: "1.2rem" }}>
                    <strong>Professor:</strong> {group.professor}
                  </p>
                </div>

                <button
                  onClick={() => handleLeave(group.groupName)}
                  style={{
                    padding: "0.6rem 1rem",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    fontWeight: "700",
                    height: "fit-content",
                  }}
                >
                  Leave Group
                </button>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  color: "#0C2340",
                  borderRadius: "0.8rem",
                  padding: "1rem",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: "1rem",
                    fontSize: "1.2rem",
                  }}
                >
                  Group Chat
                </h3>

                {(groupChats[group.groupName] || []).map((chat, chatIndex) => (
                  <div
                    key={chatIndex}
                    style={{
                      marginBottom: "0.9rem",
                      paddingBottom: "0.9rem",
                      borderBottom:
                        chatIndex !== (groupChats[group.groupName] || []).length - 1
                          ? "1px solid #ddd"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <p style={{ margin: 0, fontWeight: "700" }}>{chat.name}</p>
                      <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                        {chat.time}
                      </p>
                    </div>
                    <p style={{ margin: "0.25rem 0 0 0" }}>{chat.message}</p>
                  </div>
                ))}

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "1rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={draftMessages[group.groupName] || ""}
                    onChange={(e) =>
                      handleDraftChange(group.groupName, e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage(group.groupName);
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <button
                    onClick={() => handleSendMessage(group.groupName)}
                    style={{
                      padding: "0.8rem 1.2rem",
                      backgroundColor: "#FFD700",
                      color: "#0C2340",
                      fontWeight: "700",
                      borderRadius: "0.5rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default JoinedGroups;