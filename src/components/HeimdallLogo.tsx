"use client";

import { motion } from "framer-motion";

export default function HeimdallLogo({ size = 80 }: { size?: number }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.polygon
        points="50,5 95,25 95,75 50,95 5,75 5,25"
        fill="none"
        stroke="#00F0FF"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <motion.polygon
        points="50,16 82,33 82,67 50,84 18,67 18,33"
        fill="none"
        stroke="#1E293B"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
      />
      <motion.polygon
        points="22,50 50,36 78,50 50,64"
        fill="none"
        stroke="#8A2BE2"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
      />
      <motion.line
        x1="50"
        y1="5"
        x2="50"
        y2="36"
        stroke="#00F0FF"
        strokeWidth="1.5"
        opacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      />
      <motion.line
        x1="50"
        y1="64"
        x2="50"
        y2="95"
        stroke="#00F0FF"
        strokeWidth="1.5"
        opacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      />
      <motion.line
        x1="5"
        y1="25"
        x2="36"
        y2="43"
        stroke="#8A2BE2"
        strokeWidth="1.5"
        opacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
      <motion.line
        x1="95"
        y1="25"
        x2="64"
        y2="43"
        stroke="#8A2BE2"
        strokeWidth="1.5"
        opacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
      <motion.line
        x1="5"
        y1="75"
        x2="36"
        y2="57"
        stroke="#8A2BE2"
        strokeWidth="1.5"
        opacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
      <motion.line
        x1="95"
        y1="75"
        x2="64"
        y2="57"
        stroke="#8A2BE2"
        strokeWidth="1.5"
        opacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      />
      <motion.rect
        x="44"
        y="44"
        width="12"
        height="12"
        fill="#00F0FF"
        transform="rotate(45 50 50)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="2"
        fill="#FFFFFF"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 1.4 }}
      />
    </motion.svg>
  );
}
