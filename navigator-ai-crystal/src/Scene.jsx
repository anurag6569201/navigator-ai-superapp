// src/Scene.jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, useScroll } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

export const Scene = () => {
    const meshRef = useRef();
    const scroll = useScroll(); // Gets scroll data

    useFrame((state, delta) => {
        // This makes the crystal rotate based on scroll progress
        const scrollOffset = scroll.offset;
        meshRef.current.rotation.x = scrollOffset * Math.PI * 2;
        meshRef.current.rotation.y = scrollOffset * Math.PI * 1.5;

        // Make it gently rotate on its own
        meshRef.current.rotation.z += delta * 0.1;
    });

    return (
        <motion.group>
            {/* The Crystal */}
            <motion.mesh 
              ref={meshRef}
              // The crystal scales up as you scroll into Act 2
              scale={scroll.offset * 3}
            >
                <Icosahedron args={[1, 0]} />
                <meshStandardMaterial 
                    color="#00ffff" 
                    emissive="#00ffff" 
                    emissiveIntensity={2} 
                    metalness={1} 
                    roughness={0.1} 
                />
            </motion.mesh>
        </motion.group>
    );
};