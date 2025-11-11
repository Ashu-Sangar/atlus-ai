"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <main className="flex h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">{message}</h1>
    </main>
  );
}