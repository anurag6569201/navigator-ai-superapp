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
        
      </div>
    </div>
  );
};

export default Landing;
