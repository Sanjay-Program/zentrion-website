'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

// Generate some random coordinates on a sphere for mock attack lines
const generateAttackLines = (count: number) => {
  const lines = [];
  for (let i = 0; i < count; i++) {
    // Random start point on sphere
    const phi1 = Math.acos(-1 + (2 * i) / count);
    const theta1 = Math.sqrt(count * Math.PI) * phi1;
    const p1 = new THREE.Vector3().setFromSphericalCoords(1.05, phi1, theta1);

    // Random end point on sphere
    const phi2 = Math.random() * Math.PI;
    const theta2 = Math.random() * Math.PI * 2;
    const p2 = new THREE.Vector3().setFromSphericalCoords(1.05, phi2, theta2);

    // Calculate a curved path by finding a midpoint and pulling it outwards
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5).normalize().multiplyScalar(1.3);
    
    const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
    lines.push(curve.getPoints(20));
  }
  return lines;
};

function GlobeInner() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Rotate the whole globe slowly
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const attackLines = useMemo(() => generateAttackLines(15), []);

  return (
    <group ref={groupRef}>
      {/* Base Earth Sphere */}
      <Sphere args={[1, 64, 64]}>
        <meshBasicMaterial color="#05070d" />
      </Sphere>

      {/* Wireframe Overlap for Matrix look */}
      <Sphere args={[1.01, 32, 32]}>
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.15} />
      </Sphere>

      {/* Pulsing Core Light */}
      <pointLight color="#2f6bff" intensity={2} distance={5} />

      {/* Threat Arcs */}
      {attackLines.map((points, index) => (
        <Line 
          key={index}
          points={points}
          color={Math.random() > 0.5 ? '#ef4444' : '#00d4ff'} 
          lineWidth={1.5}
          transparent
          opacity={0.6}
        />
      ))}
      
      {/* Data Nodes */}
      {attackLines.map((points, index) => (
        <mesh key={`node-${index}`} position={points[0]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      ))}
    </group>
  );
}

export function ThreatGlobe() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative pointer-events-none force-dark">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <GlobeInner />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
