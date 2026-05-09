import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export interface Aircraft {
  icao: string;
  callsign?: string;
  lat: number;
  lon: number;
  altitude?: number;
  speed?: number;
  track?: number;
  verticalRate?: number;
  squawk?: string;
  category?: string;
  lastSeen?: number;
}

interface ADSBLolResponse {
  [key: string]: {
    hex: string;
    type?: string;
    flight?: string;
    r?: string;
    t?: string;
    dbFlags?: number;
    lat?: number;
    lon?: number;
    validPosition?: boolean;
    altitude?: number;
    altGeom?: number;
    gs?: number;
    track?: number;
    trackRate?: number;
    roll?: number;
    magHeading?: number;
    trueHeading?: number;
    baro_rate?: number;
    geom_rate?: number;
    squawk?: string;
    emergency?: string;
    sil?: number;
    silType?: string;
    sda?: number;
    mlat?: string[];
    tisb?: string[];
    messages?: number;
    seen?: number;
    rssi?: number;
  };
}

interface ADSBExchangeResponse {
  ac: Array<{
    icao: string;
    flight?: string;
    lat?: number;
    lon?: number;
    alt?: number;
    spd?: number;
    track?: number;
    vsi?: number;
    squawk?: string;
    category?: string;
    seen?: number;
  }>;
}

const ADSB_LOL_URL = 'https://api.adsb.lol/api/0/receiver';
const ADSBEXCHANGE_URL = 'https://api.adsbexchange.com/v2/json';

export const useAircraftData = (
  bounds?: { north: number; south: number; east: number; west: number },
  pollInterval: number = 5000
) => {
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'adsb.lol' | 'adsbexchange'>('adsb.lol');

  const fetchFromADSBLol = useCallback(async () => {
    try {
      // ADSB.lol API - tüm uçakları döndürür
      const response = await axios.get<ADSBLolResponse>(ADSB_LOL_URL, {
        timeout: 10000,
      });

      const data = response.data;
      const aircraftList: Aircraft[] = [];

      for (const [, plane] of Object.entries(data)) {
        if (plane.lat !== undefined && plane.lon !== undefined) {
          // Bölge filtrelemesi
          if (bounds) {
            if (
              plane.lat < bounds.south ||
              plane.lat > bounds.north ||
              plane.lon < bounds.west ||
              plane.lon > bounds.east
            ) {
              continue;
            }
          }

          aircraftList.push({
            icao: plane.hex,
            callsign: plane.flight?.trim(),
            lat: plane.lat,
            lon: plane.lon,
            altitude: plane.altitude || plane.altGeom,
            speed: plane.gs,
            track: plane.track,
            verticalRate: plane.geom_rate || plane.baro_rate,
            squawk: plane.squawk,
            category: plane.t,
            lastSeen: plane.seen,
          });
        }
      }

      setAircraft(aircraftList);
      setSource('adsb.lol');
      setError(null);
      return true;
    } catch (err) {
      console.error('ADSB.lol API error:', err);
      return false;
    }
  }, [bounds]);

  const fetchFromADSBExchange = useCallback(async () => {
    try {
      // ADSBExchange API
      const params: Record<string, any> = {};

      if (bounds) {
        params.lamin = bounds.south;
        params.lamax = bounds.north;
        params.lomin = bounds.west;
        params.lomax = bounds.east;
      }

      const response = await axios.get<ADSBExchangeResponse>(ADSBEXCHANGE_URL, {
        params,
        timeout: 10000,
      });

      const aircraftList: Aircraft[] = response.data.ac
        .filter((plane) => plane.lat !== undefined && plane.lon !== undefined)
        .map((plane) => ({
          icao: plane.icao,
          callsign: plane.flight?.trim(),
          lat: plane.lat!,
          lon: plane.lon!,
          altitude: plane.alt,
          speed: plane.spd,
          track: plane.track,
          verticalRate: plane.vsi,
          squawk: plane.squawk,
          category: plane.category,
          lastSeen: plane.seen,
        }));

      setAircraft(aircraftList);
      setSource('adsbexchange');
      setError(null);
      return true;
    } catch (err) {
      console.error('ADSBExchange API error:', err);
      return false;
    }
  }, [bounds]);

  const fetchAircraftData = useCallback(async () => {
    setLoading(true);
    try {
      // Önce ADSB.lol'u dene
      const success = await fetchFromADSBLol();

      // ADSB.lol başarısız olursa ADSBExchange'i dene
      if (!success) {
        const exchangeSuccess = await fetchFromADSBExchange();
        if (!exchangeSuccess) {
          setError('Her iki veri kaynağından da veri alınamadı');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
    } finally {
      setLoading(false);
    }
  }, [fetchFromADSBLol, fetchFromADSBExchange]);

  useEffect(() => {
    fetchAircraftData();

    const interval = setInterval(fetchAircraftData, pollInterval);

    return () => clearInterval(interval);
  }, [fetchAircraftData, pollInterval]);

  return {
    aircraft,
    loading,
    error,
    source,
    refetch: fetchAircraftData,
  };
};
