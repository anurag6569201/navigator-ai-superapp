// src/App.jsx (Updated)
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { Scene } from './Scene'; // Import the new scene
import { ActOne_ShardStorm, ActTwo_TheCrystal, ActThree_TheFacets, ActFour_ParticleFlow, ActFive_CTA } from './components';

export default function App() {
  // Lenis setup remains the same...
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <Canvas
        style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <ambientLight intensity={1} />
        {/* Wrap the Scene in ScrollControls */}
        {/* Pages = how many "screens" of scrolling. Damping = smoothness. */}
        <ScrollControls pages={5} damping={0.3}>
          <Scene />
        </ScrollControls>
      </Canvas>

      <main className="relative z-10">
        <ActOne_ShardStorm />
        <ActTwo_TheCrystal />
        <ActThree_TheFacets />
        <ActFour_ParticleFlow />
        <ActFive_CTA />
      </main>
    </>
  );
}