import Scene3D from '@/components/three/Scene3D';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { motion } from 'framer-motion';
import { Scene1 } from './Scene1';

const Index = () => {
  const { scrollProgress, currentAct } = useScrollProgress();

  return (
    <div className="relative">
      {/* 3D Scene Background */}
      <Scene3D currentAct={currentAct} scrollProgress={scrollProgress} />
      
      {/* Content Sections */}
      <div className="relative z-10 pointer-events-none">
        
        <Scene1 />

        {/* Act II: The Crystallization */}
        <section className="h-screen flex items-center justify-center">
          <motion.div 
            className="journey-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: currentAct === 2 ? 1 : 0, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl font-extralight text-primary">
              We find the perfect structure
            </h1>
            <p className="text-lg md:text-xl text-foreground mt-4 font-light">
              Watch clarity emerge from chaos
            </p>
          </motion.div>
        </section>

        {/* Act III: The Features */}
        <section className="h-screen flex items-center justify-center">
          <motion.div 
            className="journey-text pointer-events-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: currentAct === 3 ? 1 : 0, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl font-extralight text-primary mb-8">
              Navigator AI
            </h1>
            <div className="glass-surface rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-medium mb-4">The Crystal Clarity</h3>
              <p className="text-muted-foreground">
                Explore each facet to discover how we bring perfect structure to your digital journey.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Act IV: Call to Action */}
        <section className="h-screen flex items-center justify-center">
          <motion.div 
            className="journey-text pointer-events-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: currentAct === 4 ? 1 : 0, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl md:text-5xl font-extralight text-primary-glow mb-8">
              Align Your Journey
            </h1>
            <motion.button
              className="glass-surface rounded-full px-12 py-4 text-lg font-medium text-primary hover:shadow-crystal transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Navigator AI
            </motion.button>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Index;
