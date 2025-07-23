import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface CrystalCoreProps {
  visible: boolean;
  scale: number;
}

export default function CrystalCore({ visible, scale }: CrystalCoreProps) {
  const meshRef = useRef<Mesh>(null);
  
  // Create beautiful crystal geometry
  const geometry = new THREE.OctahedronGeometry(1, 2);
  
  useFrame((state) => {
    if (!meshRef.current || !visible) return;
    
    const time = state.clock.getElapsedTime();
    
    // Gentle rotation
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    
    // Subtle pulsing scale
    const pulseScale = scale * (1 + Math.sin(time * 1.5) * 0.05);
    meshRef.current.scale.setScalar(pulseScale);
  });

  if (!visible) return null;

  return (
    <group>
      {/* Main crystal */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color="#60a5fa"
          transparent
          opacity={0.8}
          transmission={0.9}
          thickness={0.1}
          roughness={0}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          emissive="#1e40af"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh geometry={geometry} scale={0.9}>
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Outer aura */}
      <mesh geometry={geometry} scale={1.2}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}