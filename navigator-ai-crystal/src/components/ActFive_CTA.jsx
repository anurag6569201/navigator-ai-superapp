import { motion } from 'framer-motion';

export const ActFive_CTA = () => {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-6xl font-bold">Align Your Journey.</h2>
        <motion.button 
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 30px rgba(0, 255, 255, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            className="mt-8 px-12 py-4 bg-cyan-500 text-black font-bold text-xl rounded-lg"
        >
            Join the Waitlist
        </motion.button>
    </section>
  );
};