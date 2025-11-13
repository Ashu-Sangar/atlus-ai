"use client";

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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
          >
            <span className="text-sm text-white/70">
              ✨ AI-Powered Productivity
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl tracking-tight"
          >
            Focus smarter.
            <br />
            <span className="bg-gradient-to-r from-[#C4B5FD] to-[#93C5FD] bg-clip-text text-transparent">
              Not harder.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-white/60 max-w-2xl mx-auto lg:mx-0"
          >
            AI-powered insights that help you master deep work and eliminate
            distractions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#C4B5FD] to-[#93C5FD] hover:opacity-90 transition-opacity border-0 text-lg px-8 py-6 shadow-[0_0_40px_rgba(196,181,253,0.3)] hover:shadow-[0_0_60px_rgba(196,181,253,0.4)]"
            >
              Start Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6 group"
            >
              <Play size={20} className="mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex gap-8 justify-center lg:justify-start pt-8"
          >
            <div>
              <div className="text-3xl bg-gradient-to-r from-[#C4B5FD] to-[#93C5FD] bg-clip-text text-transparent">
                10k+
              </div>
              <div className="text-sm text-white/50">Active Users</div>
            </div>
            <div>
              <div className="text-3xl bg-gradient-to-r from-[#C4B5FD] to-[#93C5FD] bg-clip-text text-transparent">
                500k+
              </div>
              <div className="text-sm text-white/50">Focus Sessions</div>
            </div>
            <div>
              <div className="text-3xl bg-gradient-to-r from-[#C4B5FD] to-[#93C5FD] bg-clip-text text-transparent">
                98%
              </div>
              <div className="text-sm text-white/50">Satisfaction</div>
            </div>
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
