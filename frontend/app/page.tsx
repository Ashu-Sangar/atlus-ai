'use client';
import { useState, useEffect } from "react";

import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { Features } from "../components/Features";
import { Testimonial } from "../components/Testimonial";
import { Footer } from "../components/Footer";
import { AnimatedBackground } from "../components/AnimatedBackground";

export default function Page() {
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Backend responded with error");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Backend response:", data);
        setBackendMessage(data.message || "Backend connected");
      })
      .catch((error) => {
        console.error("Backend fetch error:", error);
        setBackendMessage("Backend not reachable");
      });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B0B1E] text-white overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Features />
      <Testimonial />
      <Footer />
    </div>
  );
}
