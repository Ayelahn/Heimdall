"use client";
import { motion } from "framer-motion";

export function AnimatedSection({
  children,
  className,
  delay = 0,
  y = 16,
  duration = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
