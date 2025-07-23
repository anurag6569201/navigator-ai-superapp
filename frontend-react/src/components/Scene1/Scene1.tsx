import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CalmThread } from "./CalmThread";

const chaosLines = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  length: 15 + Math.random() * 25,
  angle: Math.random() * 360,
}));

export const Scene1 = () => {
  const [showCalm, setShowCalm] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowCalm(true), 1000);
    const timer2 = setTimeout(() => setShowContent(true), 3500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section className="min-h-screen relative bg-deep-background overflow-hidden flex items-center justify-center">
      {/* Chaos Lines */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {chaosLines.map((line) => (
            <motion.div
              key={line.id}
              className="absolute w-0.5 bg-chaos-line opacity-60"
              style={{
                left: `${line.x}%`,
                top: `${line.y}%`,
                height: `${line.length}px`,
                transform: `rotate(${line.angle}deg)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: showCalm ? 0 : 0.6,
                x: [-2, 5, -5, 2],
                y: [-1, 3, -3, 1],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                opacity: { duration: 1 }
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Calm Thread */}
      {showCalm && (
        <CalmThread
          pathData="M 0,50 Q 25,30 50,50 T 100,45"
          duration={2.5}
          className="z-10"
        />
      )}

      {/* Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="text-center z-20 max-w-4xl mx-auto px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-foreground mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              There is a <span className="text-calm-thread animate-calm-glow" style={{color:'#57c2f5'}}>calmer</span> way to travel
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Navigator AI untangles the chaos of Indian travel into a single, predictive flow
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};