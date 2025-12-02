'use client';
import { useState, useEffect } from "react";

import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { Features } from "../components/Features";
import { Testimonial } from "../components/Testimonial";
import { Footer } from "../components/Footer";
import FloatingLines from "../components/FloatingLines";

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
    <div className="relative min-h-screen bg-[#09090b] dark:bg-[#09090b] light:bg-white text-white dark:text-white light:text-black overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' }}>
        <FloatingLines
          scrollParallax={true}
          scrollStrength={0.5}
          linesGradient={['#ffffff', '#a855f7', '#22c55e']}
        />
      </div>
      <Navbar />
      <Hero />
      <Features />
      <Testimonial />
      <Footer />
    </div>
  );
}
