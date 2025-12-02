"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingUI } from "./FloatingUI";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20">

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center lg:text-left space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-block p-8 -ml-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/50"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight font-bold drop-shadow-2xl mb-6">
              Focus smarter.
              <br />
              <span className="bg-gradient-to-r from-[#C4B5FD] to-[#93C5FD] bg-clip-text text-transparent drop-shadow-sm">
                Not harder.
              </span>
            </h1>

            <p className="text-xl text-white/90 max-w-2xl font-medium drop-shadow-md">
              AI-powered insights that help you master deep work and eliminate
              distractions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#C4B5FD] to-[#93C5FD] hover:opacity-90 transition-opacity border-0 text-lg px-8 py-6 shadow-[0_0_40px_rgba(196,181,253,0.3)] hover:shadow-[0_0_60px_rgba(196,181,253,0.4)]"
              >
                Start Free
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-lg px-8 py-6 group shadow-lg shadow-black/20 text-white"
            >
              <Play size={20} className="mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>


        </motion.div>

        {/* Right Content - Floating UI */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:block"
        >
          <FloatingUI />
        </motion.div>
      </div>
    </section>
  );
}
