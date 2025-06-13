// src/PrivacyPolicy.js
import React, { useEffect, useState } from "react";

export default function PrivacyPolicy() {
  const [text, setText] = useState("Loading...");

  useEffect(() => {
    fetch("/privacy.txt")
      .then((res) => res.text())
      .then(setText)
      .catch((err) => setText("Failed to load privacy policy."));
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary flex-column vh-100">
      <div
        style={{
          whiteSpace: "pre-wrap",
          padding: "2rem",
          fontFamily: "Arial, sans-serif",
        }}
        className="bg-white p-3 rounded-5 w-75 m-5 inline-flex overflow-auto h-75"
      >
        <h2 className="text-center mt-2 mb-3 ">Privacy Policy</h2>

        <p>{text}</p>
      </div>
    </div>
  );
}
