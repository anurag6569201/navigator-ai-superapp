import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

useEffect(() => {
  let progress = 0;
  const steps = 20; // 2 seconds / 100ms
  const increment = 100 / steps; // 5 each step
  const intervalTime = 100; // ms

  const timer = setInterval(() => {
    progress += increment;
    setProgress(progress);

    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(() => setIsLoading(false), 200); // Optional delay after loading
    }
  }, intervalTime);
}, []);


  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center">
            <motion.div
              className="w-16 h-16 border-2 border-blue-500 rounded-lg mx-auto mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg opacity-50" />
            </motion.div>
            
            <h1 className="text-2xl font-light text-white mb-4 text-glow">
              Navigator AI
            </h1>
            
            <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            
            <p className="text-white/60 mt-4 text-sm">
              Initializing crystal clarity...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;