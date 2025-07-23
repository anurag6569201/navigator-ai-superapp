import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { InstancedMesh, Matrix4, Vector3 } from 'three';
import * as THREE from 'three';

interface ShardStormProps {
  count?: number;
  mousePosition: { x: number; y: number };
  crystallizing: boolean;
}

export default function ShardStorm({ count = 200, mousePosition, crystallizing }: ShardStormProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const { viewport } = useThree();
  
  // Create shard geometry - irregular, sharp fragments
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const indices: number[] = [];
    
    // Create a jagged, irregular shard shape
    const baseShape = [
      [-0.5, -0.3, 0], [0.2, -0.4, 0], [0.6, 0.1, 0], 
      [0.1, 0.7, 0], [-0.3, 0.5, 0], [-0.7, 0.2, 0]
    ];
    
    // Extrude to create 3D shard
    baseShape.forEach(([x, y]) => {
      vertices.push(x, y, -0.1); // Front face
      vertices.push(x, y, 0.1);  // Back face
    });
    
    // Create faces
    for (let i = 0; i < baseShape.length; i++) {
      const next = (i + 1) % baseShape.length;
      const frontA = i * 2;
      const frontB = next * 2;
      const backA = frontA + 1;
      const backB = frontB + 1;
      
      // Front and back faces
      if (i < baseShape.length - 2) {
        indices.push(0, frontA + 2, frontA + 4); // Front
        indices.push(1, backA + 4, backA + 2);   // Back
      }
      
      // Side faces
      indices.push(frontA, backA, frontB);
      indices.push(frontA, frontB, backB);
    }
    
    geo.setIndex(indices);
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.computeVertexNormals();
    
    return geo;
  }, []);

  // Initialize shard positions and properties
  const { initialPositions, targetPositions, velocities } = useMemo(() => {
    const initial: Vector3[] = [];
    const targets: Vector3[] = [];
    const vels: Vector3[] = [];
    
    for (let i = 0; i < count; i++) {
      // Random initial positions in chaos
      initial.push(new Vector3(
        (Math.random() - 0.5) * viewport.width * 2,
        (Math.random() - 0.5) * viewport.height * 2,
        (Math.random() - 0.5) * 10
      ));
      
      // Calculate crystal formation targets (geometric pattern)
      const radius = 2 + Math.random() * 1.5;
      const theta = (i / count) * Math.PI * 2 * 5; // Multiple spirals
      const phi = Math.acos(1 - 2 * (i / count));
      
      targets.push(new Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ));
      
      vels.push(new Vector3(0, 0, 0));
    }
    
    return { 
      initialPositions: initial, 
      targetPositions: targets, 
      velocities: vels 
    };
  }, [count, viewport]);

  const currentPositions = useRef(initialPositions.map(pos => pos.clone()));
  const dummy = useMemo(() => new Matrix4(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const position = currentPositions.current[i];
      
      if (!crystallizing) {
        // Act I: Chaos mode - respond to mouse
        const mouseForce = new Vector3(
          mousePosition.x * viewport.width / 2,
          -mousePosition.y * viewport.height / 2,
          0
        );
        
        const distance = position.distanceTo(mouseForce);
        const forceStrength = Math.max(0, 2 - distance / 3);
        
        if (forceStrength > 0) {
          const direction = position.clone().sub(mouseForce).normalize();
          velocities[i].add(direction.multiplyScalar(forceStrength * 0.01));
        }
        
        // Add some floating movement
        velocities[i].add(new Vector3(
          Math.sin(time * 0.5 + i * 0.1) * 0.001,
          Math.cos(time * 0.3 + i * 0.1) * 0.001,
          Math.sin(time * 0.7 + i * 0.1) * 0.001
        ));
        
        // Apply velocity with damping
        position.add(velocities[i]);
        velocities[i].multiplyScalar(0.98);
        
      } else {
        // Act II: Crystallization - move toward target
        const target = targetPositions[i];
        const direction = target.clone().sub(position);
        position.add(direction.multiplyScalar(0.02));
      }
      
      // Update instance matrix
      dummy.makeRotationFromEuler(new THREE.Euler(
        time * 0.5 + i * 0.1,
        time * 0.3 + i * 0.1,
        time * 0.7 + i * 0.1
      ));
      dummy.setPosition(position);
      meshRef.current.setMatrixAt(i, dummy);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh 
      ref={meshRef} 
      args={[geometry, undefined, count]}
      frustumCulled={false}
    >
      <meshPhongMaterial 
        color={crystallizing ? "#60a5fa" : "#64748b"}
        transparent
        opacity={0.7}
        emissive={crystallizing ? "#64748b" : "#000000"}
        emissiveIntensity={crystallizing ? 0.3 : 0}
      />
    </instancedMesh>
  );
}