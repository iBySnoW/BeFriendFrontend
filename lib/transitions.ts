"use client"

import { motion } from "framer-motion"

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const slideTransition = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
}

export const MotionDiv = motion.div
