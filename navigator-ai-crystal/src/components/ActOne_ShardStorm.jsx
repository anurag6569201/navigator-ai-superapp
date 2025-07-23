import { motion } from 'framer-motion';

export const ActOne_ShardStorm = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-6xl md:text-8xl font-bold"
      >
        Your journey is fragmented.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="text-xl md:text-2xl mt-4"
      >
        Scroll to find the structure.
      </motion.p>
    </section>
  );
};