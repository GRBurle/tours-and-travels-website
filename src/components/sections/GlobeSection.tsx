import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import Modal from '../ui/Modal';
import { MapPin, ArrowRight } from 'lucide-react';

// Destinations to show on Globe
const GLOBE_MARKERS = [
  { id: 'paris', name: 'Paris', lat: 48.8566, lng: 2.3522, desc: 'The city of light and romance.' },
  { id: 'tokyo', name: 'Tokyo', lat: 35.6762, lng: 139.6503, desc: 'Futuristic cityscapes blending with ancient temples.' },
  { id: 'newyork', name: 'New York', lat: 40.7128, lng: -74.0060, desc: 'The city that never sleeps.' },
  { id: 'sydney', name: 'Sydney', lat: -33.8688, lng: 151.2093, desc: 'Iconic beaches and opera house.' },
  { id: 'dubai', name: 'Dubai', lat: 25.2048, lng: 55.2708, desc: 'Ultra-luxury in the desert.' }
];

// Helper to convert lat/lng to 3D position on a sphere of radius R
function getPositionFromLatLng(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return [x, y, z];
}

// A simple procedural particle globe representation
function ParticleGlobe({ onMarkerClick }: { onMarkerClick: (marker: any) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesCount = 2000;
  
  // Generate random points on a sphere
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / particlesCount);
    const theta = Math.sqrt(particlesCount * Math.PI) * phi;
    
    positions[i * 3] = 2.5 * Math.cos(theta) * Math.sin(phi);
    positions[i * 3 + 1] = 2.5 * Math.sin(theta) * Math.sin(phi);
    positions[i * 3 + 2] = 2.5 * Math.cos(phi);
  }

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
      </points>
      {/* Inner glowing sphere */}
      <Sphere args={[2.45, 64, 64]}>
        <meshBasicMaterial color="#050510" transparent opacity={0.8} />
      </Sphere>

      {/* Markers */}
      {GLOBE_MARKERS.map((marker) => {
        const pos = getPositionFromLatLng(marker.lat, marker.lng, 2.5);
        return (
          <group key={marker.id} position={pos}>
            <mesh>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color="#d4af37" />
            </mesh>
            <Html distanceFactor={15}>
              <div 
                onClick={(e) => { e.stopPropagation(); onMarkerClick(marker); }}
                className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs whitespace-nowrap cursor-pointer hover:bg-accent hover:text-black transition-colors border border-white/10 flex items-center gap-1"
                style={{ transform: 'translate3d(-50%, -150%, 0)' }}
              >
                <MapPin className="w-3 h-3" />
                {marker.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function GlobeSection() {
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);

  return (
    <>
      <section className="py-20 relative h-[80vh] flex items-center hidden md:flex" id="destinations">
        <div className="absolute inset-0 z-0 opacity-50 cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <ParticleGlobe onMarkerClick={setSelectedLocation} />
            <OrbitControls 
              enableZoom={true}
              minDistance={3}
              maxDistance={10}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex justify-end pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-md glass p-8 rounded-3xl pointer-events-auto"
          >
            <h2 className="text-4xl font-bold mb-4">Discover the <span className="font-serif italic text-accent">World</span></h2>
            <p className="text-text-muted mb-8">
              Interact with our 3D globe. Drag to rotate, scroll to zoom, and click the golden markers to explore exclusive luxury destinations reserved for our members.
            </p>
            <button 
              onClick={() => alert('Map Explorer coming soon. For now please click the markers on the globe!')}
              className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-accent hover:text-white transition-colors cursor-pointer w-full uppercase tracking-wider text-sm"
            >
              Explore Map
            </button>
          </motion.div>
        </div>
      </section>

      <Modal isOpen={!!selectedLocation} onClose={() => setSelectedLocation(null)} title={`Explore ${selectedLocation?.name}`}>
        {selectedLocation && (
          <div>
             <h3 className="text-2xl font-serif italic mb-4 text-accent">{selectedLocation.name}</h3>
             <p className="text-text-muted mb-8">{selectedLocation.desc}</p>
             <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass p-4 rounded-xl">
                  <span className="block text-xs uppercase tracking-widest text-text-muted mb-1">Status</span>
                  <span className="font-bold text-green-400">Available</span>
                </div>
                <div className="glass p-4 rounded-xl">
                  <span className="block text-xs uppercase tracking-widest text-text-muted mb-1">Experiences</span>
                  <span className="font-bold">24+ Curated</span>
                </div>
             </div>
             <button 
                onClick={() => { alert(`Redirecting to ${selectedLocation.name} packages...`); setSelectedLocation(null); }}
                className="w-full py-4 bg-accent text-bg font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
              >
                View Packages <ArrowRight className="w-5 h-5" />
              </button>
          </div>
        )}
      </Modal>
    </>
  );
}
