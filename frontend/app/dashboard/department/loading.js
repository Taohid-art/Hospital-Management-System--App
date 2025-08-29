// app/loading.jsx or app/any-path/loading.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/public/images/vector.png"
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <motion.div
        className="w-24 h-24 relative"
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <Image
          src={logo} // Change to your own logo/image path
          alt="Loading..."
          layout="fill"
          fill
          objectFit="contain"
        />
      </motion.div>

      <motion.h2
        className="mt-8 text-2xl font-semibold text-blue-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        Please wait, loading...
      </motion.h2>
    </div>
  );
}
