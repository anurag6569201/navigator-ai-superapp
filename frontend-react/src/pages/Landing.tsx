import Scene3D from '@/components/three/Scene3D';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { motion } from 'framer-motion';
import { Scene1 } from '../components/Scene1/Scene1';
import LoadingScreen from '@/components/loader/LoadingScreen';

const Landing = () => {
  const { scrollProgress, currentAct } = useScrollProgress();

  return (
    <div className="relative">
      <Scene3D currentAct={currentAct} scrollProgress={scrollProgress} />
      <LoadingScreen />
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
        
        
      </div>
    </div>
  );
};

export default Landing;
