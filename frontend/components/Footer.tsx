"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 lg:px-8 border-t border-white/10 bg-[#0B0B1E]/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C4B5FD] to-[#93C5FD] flex items-center justify-center">
              <span className="font-bold">FM</span>
            </div>
            <span className="font-semibold tracking-tight">FocusMate AI</span>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-white/50 text-sm"
          >
            © {currentYear} FocusMate AI. All rights reserved.
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <a
              href="#twitter"
              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-200 group"
            >
              <Twitter
                size={18}
                className="text-white/60 group-hover:text-white transition-colors"
              />
            </a>
            <a
              href="#github"
              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-200 group"
            >
              <Github
                size={18}
                className="text-white/60 group-hover:text-white transition-colors"
              />
            </a>
            <a
              href="#linkedin"
              className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-200 group"
            >
              <Linkedin
                size={18}
                className="text-white/60 group-hover:text-white transition-colors"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
