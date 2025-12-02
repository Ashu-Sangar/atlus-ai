"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useInView } from "./hooks/useInView";

export function Testimonial() {
  const [ref, isInView] = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 lg:px-8 overflow-hidden"
    >


      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-12 md:p-16 text-center"
        >
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#C4B5FD] to-[#93C5FD] mb-8"
          >
            <Quote size={32} />
          </motion.div>

          {/* Quote Text */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-4xl mb-8 leading-relaxed"
          >
            "Productivity is not about doing more,
            <br />
            it's about doing what matters —{" "}
            <span className="bg-gradient-to-r from-[#C4B5FD] to-[#93C5FD] bg-clip-text text-transparent">
              smarter
            </span>
            ."
          </motion.blockquote>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/60"
          >
            — Atlus
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}
