import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import ShardStorm from './ShardStorm';
import CrystalCore from './CrystalCore';

interface Scene3DProps {
  currentAct: number;
  scrollProgress: number;
}

export default function Scene3D({ currentAct, scrollProgress }: Scene3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="scene-canvas">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          
          {/* Lighting setup */}
          <ambientLight intensity={0.2} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight 
            position={[0, 0, 0]} 
            intensity={currentAct >= 2 ? 1 : 0}
            color="#60a5fa"
          />
          
          {/* Act I & II: Shard Storm */}
          {currentAct <= 2 && (
            <ShardStorm
              mousePosition={mousePosition}
              crystallizing={currentAct === 2}
              count={150}
            />
          )}
          
          {/* Act II & III: Crystal Core */}
          {currentAct >= 2 && (
            <CrystalCore
              visible={currentAct >= 2}
              scale={currentAct === 2 ? scrollProgress : 1}
            />
          )}
          
          {/* Controls for Act III */}
          {currentAct === 3 && (
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              autoRotate={false}
              maxDistance={12}
              minDistance={4}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}