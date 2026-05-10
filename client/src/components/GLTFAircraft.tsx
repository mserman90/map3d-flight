import React, { useEffect, useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { Aircraft } from '@/hooks/useAircraftData';

interface GLTFAircraftProps {
  aircraft: Aircraft;
  selected?: boolean;
  modelUrl?: string;
}

// GLTF modeli yükleyen bileşen
export const GLTFAircraft: React.FC<GLTFAircraftProps> = ({
  aircraft,
  selected = false,
  modelUrl = '/manus-storage/simple_airplane_4b9df732.glb',
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const { camera } = useThree();
  const [model, setModel] = React.useState<THREE.Group | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Enlem/boylamı 3D koordinatlara dönüştür
  const position = useMemo(() => {
    const x = (aircraft.lon - (-180)) / 360 * 100 - 50;
    const z = (aircraft.lat - (-90)) / 180 * 100 - 50;
    const y = (aircraft.altitude || 0) / 10000;

    return [x, y, z] as [number, number, number];
  }, [aircraft.lon, aircraft.lat, aircraft.altitude]);

  // GLTF modeli yükle
  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load(
      modelUrl,
      (gltf: any) => {
        const clonedScene = gltf.scene.clone();
        
        // Modeli ölçeklendir
        clonedScene.scale.set(0.5, 0.5, 0.5);

        // Materyalleri ayarla
        clonedScene.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            if (selected) {
              child.material = new THREE.MeshStandardMaterial({
                color: '#06B6D4',
                emissive: '#06B6D4',
                emissiveIntensity: 0.5,
                metalness: 0.5,
                roughness: 0.5,
              });
            } else {
              child.material = new THREE.MeshStandardMaterial({
                color: '#0F172A',
                metalness: 0.3,
                roughness: 0.7,
              });
            }
          }
        });

        setModel(clonedScene);
        setLoading(false);
      },
      undefined,
      (error: any) => {
        console.error('GLTF yükleme hatası:', error);
        setError(error.message);
        setLoading(false);
      }
    );
  }, [modelUrl, selected]);

  // Modeli grup içine ekle
  useEffect(() => {
    if (groupRef.current && model && !modelRef.current) {
      groupRef.current.add(model);
      modelRef.current = model;
    }
  }, [model]);

  // Animasyon: döndür ve yön ayarla
  useFrame(() => {
    if (groupRef.current) {
      // Uçağın yönünü track'e göre ayarla
      if (aircraft.track !== undefined) {
        groupRef.current.rotation.y = (aircraft.track * Math.PI) / 180;
      }
    }
  });

  if (error) {
    console.error('GLTF Aircraft error:', error);
    return null;
  }

  return (
    <group ref={groupRef} position={position}>
      {/* Yükleme sırasında fallback göster */}
      {loading && (
        <mesh>
          <coneGeometry args={[0.3, 1.5, 8]} />
          <meshStandardMaterial
            color={selected ? '#06B6D4' : '#0F172A'}
            emissive={selected ? '#06B6D4' : '#000000'}
          />
        </mesh>
      )}
    </group>
  );
};

export default GLTFAircraft;
