"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://192.168.0.110:3000");

export default function Home() {
  const [frame, setFrame] = useState("");

  useEffect(() => {
    socket.on("camera-frame", (data) => {
      setFrame(data);
    });

    return () => {
      socket.off("camera-frame");
    };
  }, []);

  return (
    <main
      style={{
        background: "#000",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {frame ? (
        <img
          src={frame}
          alt="camera"
          style={{
            width: "100%",
            maxWidth: 900,
            borderRadius: 20,
          }}
        />
      ) : (
        <h1 style={{ color: "#ff7a00" }}>
          Waiting for camera...
        </h1>
      )}
    </main>
  );
}