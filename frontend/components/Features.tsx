"use client";

import { motion } from "framer-motion";
import { Brain, BarChart3, LineChart } from "lucide-react";
import { useInView } from "./hooks/useInView";

const features = [
  {
    icon: Brain,
    title: "Track your focus sessions",
    description:
      "Monitor your deep work periods with intelligent session tracking that adapts to your workflow.",
    gradient: "from-[#C4B5FD] to-[#A78BFA]",
  },
  {
    icon: BarChart3,
    title: "Get AI productivity insights",
    description:
      "Receive personalized recommendations powered by AI to optimize your focus and eliminate distractions.",
    gradient: "from-[#93C5FD] to-[#C4B5FD]",
  },
  {
    icon: LineChart,
    title: "Visualize your progress",
    description:
      "Beautiful charts and analytics that show your productivity patterns and celebrate your wins.",
    gradient: "from-[#C4B5FD] to-[#93C5FD]",
  },
];

export function Features() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="features"
      className="relative py-32 px-6 lg:px-8 overflow-hidden"
    >


      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl mb-6">
            Everything you need to
            <br />
            <span className="bg-gradient-to-r from-[#C4B5FD] to-[#93C5FD] bg-clip-text text-transparent">
              stay focused
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Powerful features designed to help you achieve deep work and reach
            your productivity goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >


              <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon size={28} strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="text-2xl">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
