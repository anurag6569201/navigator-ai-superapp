import { motion } from 'framer-motion';

export const ActThree_TheFacets = () => {
  return (
    <section className="h-[150vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-end">
        <div className="max-w-md mr-12 md:mr-32 text-right space-y-8">
            <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.5}}>
                <h3 className="text-4xl font-bold text-cyan-400">The Orchestrator Core</h3>
                <p>Our AI analyzes every variable to build your optimal journey in real-time.</p>
            </motion.div>
            <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.5}}>
                <h3 className="text-4xl font-bold text-cyan-400">The Payment Prism</h3>
                <p>A single, secure wallet for every ticket and every ride.</p>
            </motion.div>
            <motion.div initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 0.5}}>
                <h3 className="text-4xl font-bold text-cyan-400">The Clarity Shard</h3>
                <p>Never overpay again with real-time, location-aware price checks.</p>
            </motion.div>
        </div>
      </div>
    </section>
  );
};