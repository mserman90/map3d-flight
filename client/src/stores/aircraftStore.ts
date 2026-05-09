import { create } from 'zustand';
import { Aircraft } from '@/hooks/useAircraftData';

interface AircraftStore {
  aircraft: Aircraft[];
  setAircraft: (aircraft: Aircraft[]) => void;
  selectedAircraft: Aircraft | null;
  setSelectedAircraft: (aircraft: Aircraft | null) => void;
  bounds: { north: number; south: number; east: number; west: number } | null;
  setBounds: (bounds: { north: number; south: number; east: number; west: number } | null) => void;
  showTrails: boolean;
  setShowTrails: (show: boolean) => void;
  trails: Map<string, Array<{ lat: number; lon: number; altitude?: number }>>;
  addTrailPoint: (icao: string, point: { lat: number; lon: number; altitude?: number }) => void;
  clearTrails: () => void;
}

export const useAircraftStore = create<AircraftStore>((set) => ({
  aircraft: [],
  setAircraft: (aircraft) => set({ aircraft }),

  selectedAircraft: null,
  setSelectedAircraft: (selectedAircraft) => set({ selectedAircraft }),

  bounds: null,
  setBounds: (bounds) => set({ bounds }),

  showTrails: false,
  setShowTrails: (showTrails) => set({ showTrails }),

  trails: new Map(),
  addTrailPoint: (icao, point) =>
    set((state) => {
      const newTrails = new Map(state.trails);
      const trail = newTrails.get(icao) || [];
      trail.push(point);
      // Son 100 noktayı tut
      if (trail.length > 100) {
        trail.shift();
      }
      newTrails.set(icao, trail);
      return { trails: newTrails };
    }),

  clearTrails: () => set({ trails: new Map() }),
}));
