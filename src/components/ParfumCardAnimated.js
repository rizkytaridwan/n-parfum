// src/components/ParfumCardAnimated.js
"use client"; // Ini adalah Client Component
import { motion } from "framer-motion";
import ParfumCard from "./ParfumCard";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ParfumCardAnimated({ parfum, index }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05, ease: "easeInOut", duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <motion.div whileHover={{ scale: 1.03 }} className="h-full">
        <ParfumCard parfum={parfum} />
      </motion.div>
    </motion.div>
  );
}