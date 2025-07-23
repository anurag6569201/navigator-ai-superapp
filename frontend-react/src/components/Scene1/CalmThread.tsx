import { motion } from "framer-motion";

interface CalmThreadProps {
  pathData: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export const CalmThread = ({ 
  pathData, 
  duration = 2, 
  delay = 0,
  className = ""
}: CalmThreadProps) => {
  return (
    <motion.svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d={pathData}
        stroke="hsl(var(--calm-thread))"
        strokeWidth="0.3"
        fill="none"
        strokeLinecap="round"
        filter="drop-shadow(0 0 8px hsl(var(--calm-thread) / 0.6))"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ 
          duration,
          delay,
          ease: "easeInOut"
        }}
      />
    </motion.svg>
  );
};