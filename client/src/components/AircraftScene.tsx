import React, { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useAircraftData, Aircraft } from '@/hooks/useAircraftData';
import { useAircraftStore } from '@/stores/aircraftStore';
import { GLTFAircraft } from './GLTFAircraft';

interface AircraftSceneProps {
  bounds?: { north: number; south: number; east: number; west: number };
  center?: { lat: number; lon: number };
  zoom?: number;
}

// 3D uçak modeli (basit piramit şekli)
const AircraftModel: React.FC<{ aircraft: Aircraft; selected?: boolean }> = ({
  aircraft,
  selected = false,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Enlem/boylamı 3D koordinatlara dönüştür
  const position = useMemo(() => {
    const x = (aircraft.lon - (-180)) / 360 * 100 - 50;
    const z = (aircraft.lat - (-90)) / 180 * 100 - 50;
    const y = (aircraft.altitude || 0) / 10000; // Yüksekliği ölçekle

    return [x, y, z] as [number, number, number];
  }, [aircraft.lon, aircraft.lat, aircraft.altitude]);

  useFrame(() => {
    if (meshRef.current) {
      // Uçağın yönünü track'e göre ayarla
      if (aircraft.track !== undefined) {
        meshRef.current.rotation.y = (aircraft.track * Math.PI) / 180;
      }
    }
  });

  const color = selected ? '#06B6D4' : '#0F172A';

  return (
    <group ref={meshRef} position={position}>
      {/* Uçak gövdesi (piramit) */}
      <mesh>
        <coneGeometry args={[0.5, 2, 8]} />
        <meshStandardMaterial color={color} emissive={selected ? '#06B6D4' : '#000000'} />
      </mesh>

      {/* Kanatlar */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[3, 0.2, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Etiketi */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {aircraft.callsign || aircraft.icao}
      </Text>

      {/* Yükseklik bilgisi */}
      {aircraft.altitude && (
        <Text
          position={[0, 1, 0]}
          fontSize={0.2}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {Math.round(aircraft.altitude)}ft
        </Text>
      )}
    </group>
  );
};

// Trail (iz) çizgisi
const AircraftTrail: React.FC<{ trail: Array<{ lat: number; lon: number; altitude?: number }> }> = ({
  trail,
}) => {
  const points = useMemo(() => {
    return trail.map((point) => {
      const x = (point.lon - (-180)) / 360 * 100 - 50;
      const z = (point.lat - (-90)) / 180 * 100 - 50;
      const y = (point.altitude || 0) / 10000;
      return new THREE.Vector3(x, y, z);
    });
  }, [trail]);

  if (points.length < 2) return null;

  const geometry = new THREE.BufferGeometry();
  geometry.setFromPoints(points);

  return (
    <line>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial color="#06B6D4" linewidth={2} transparent opacity={0.5} />
    </line>
  );
};

// Ana sahne bileşeni
const AircraftSceneContent: React.FC<AircraftSceneProps> = ({ bounds, center, zoom = 1 }) => {
  const { aircraft, loading, error, source } = useAircraftData(bounds, 5000);
  const {
    setAircraft,
    selectedAircraft,
    setSelectedAircraft,
    showTrails,
    trails,
    addTrailPoint,
  } = useAircraftStore();

  // Uçak verilerini güncelle
  useEffect(() => {
    setAircraft(aircraft);

    // Trail'e yeni noktalar ekle
    aircraft.forEach((plane) => {
      addTrailPoint(plane.icao, {
        lat: plane.lat,
        lon: plane.lon,
        altitude: plane.altitude,
      });
    });
  }, [aircraft, setAircraft, addTrailPoint]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 30, 50]} fov={75} />
      <OrbitControls />

      {/* Işıklandırma */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      {/* Yer düzlemi */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#E2E8F0" />
      </mesh>

      {/* Grid */}
      <gridHelper args={[100, 10, '#CBD5E1', '#F1F5F9']} />

      {/* Uçaklar */}
      {aircraft.map((plane) => {
        const x = (plane.lon - (-180)) / 360 * 100 - 50;
        const z = (plane.lat - (-90)) / 180 * 100 - 50;
        const y = (plane.altitude || 0) / 10000;

        return (
          <group key={plane.icao}>
            <GLTFAircraft
              aircraft={plane}
              selected={selectedAircraft?.icao === plane.icao}
            />
            {/* Tıklanabilir alan */}
            <mesh
              position={[x, y, z]}
              onClick={() => setSelectedAircraft(plane)}
            >
              <sphereGeometry args={[1.5, 8, 8]} />
              <meshStandardMaterial transparent opacity={0} />
            </mesh>
          </group>
        );
      })}

      {/* Trail'ler */}
      {showTrails &&
        Array.from(trails.entries()).map(([icao, trail]) => (
          <AircraftTrail key={`trail-${icao}`} trail={trail} />
        ))}

      {/* Bilgi paneli */}
      <Text position={[-40, 40, 0]} fontSize={1} color="#0F172A" anchorX="left">
        Uçaklar: {aircraft.length}
      </Text>
      <Text position={[-40, 38, 0]} fontSize={0.8} color="#64748B" anchorX="left">
        Kaynak: {source}
      </Text>
      {loading && (
        <Text position={[-40, 36, 0]} fontSize={0.8} color="#06B6D4" anchorX="left">
          Yükleniyor...
        </Text>
      )}
      {error && (
        <Text position={[-40, 36, 0]} fontSize={0.8} color="#EF4444" anchorX="left">
          Hata: {error}
        </Text>
      )}
    </>
  );
};

export const AircraftScene: React.FC<AircraftSceneProps> = (props) => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <AircraftSceneContent {...props} />
    </Canvas>
  );
};

export default AircraftScene;
