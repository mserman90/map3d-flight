import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Aircraft } from '@/hooks/useAircraftData';
import { X, Plane, Gauge, Compass, TrendingUp } from 'lucide-react';

interface AircraftInfoProps {
  aircraft: Aircraft | null;
  onClose: () => void;
}

export const AircraftInfo: React.FC<AircraftInfoProps> = ({ aircraft, onClose }) => {
  if (!aircraft) return null;

  const formatAltitude = (alt?: number) => {
    if (!alt) return 'N/A';
    return `${Math.round(alt)} ft`;
  };

  const formatSpeed = (speed?: number) => {
    if (!speed) return 'N/A';
    return `${Math.round(speed)} kt`;
  };

  const formatTrack = (track?: number) => {
    if (track === undefined) return 'N/A';
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(track / 22.5) % 16;
    return `${Math.round(track)}° (${directions[index]})`;
  };

  const formatVerticalRate = (rate?: number) => {
    if (!rate) return 'N/A';
    const direction = rate > 0 ? '↑' : rate < 0 ? '↓' : '→';
    return `${direction} ${Math.abs(Math.round(rate))} ft/min`;
  };

  return (
    <Card className="w-full max-w-md absolute bottom-4 left-4 z-50 shadow-xl">
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-accent" />
          <CardTitle className="text-lg">
            {aircraft.callsign || aircraft.icao}
          </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* ICAO */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs font-semibold">ICAO</p>
            <p className="font-mono text-foreground">{aircraft.icao}</p>
          </div>
          {aircraft.squawk && (
            <div>
              <p className="text-muted-foreground text-xs font-semibold">Squawk</p>
              <p className="font-mono text-foreground">{aircraft.squawk}</p>
            </div>
          )}
        </div>

        {/* Konum */}
        <div className="border-t border-border pt-3">
          <p className="text-muted-foreground text-xs font-semibold mb-2">Konum</p>
          <div className="text-sm space-y-1">
            <p className="font-mono">
              Lat: {aircraft.lat.toFixed(4)}°
            </p>
            <p className="font-mono">
              Lon: {aircraft.lon.toFixed(4)}°
            </p>
          </div>
        </div>

        {/* Uçuş Bilgileri */}
        <div className="border-t border-border pt-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Gauge className="w-4 h-4" />
              <span className="text-xs font-semibold">Yükseklik</span>
            </div>
            <span className="font-mono text-foreground">
              {formatAltitude(aircraft.altitude)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold">Hız</span>
            </div>
            <span className="font-mono text-foreground">
              {formatSpeed(aircraft.speed)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Compass className="w-4 h-4" />
              <span className="text-xs font-semibold">Yön</span>
            </div>
            <span className="font-mono text-foreground">
              {formatTrack(aircraft.track)}
            </span>
          </div>

          {aircraft.verticalRate !== undefined && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-semibold">Dikey Hız</span>
              </div>
              <span className="font-mono text-foreground">
                {formatVerticalRate(aircraft.verticalRate)}
              </span>
            </div>
          )}
        </div>

        {/* Kategori */}
        {aircraft.category && (
          <div className="border-t border-border pt-3">
            <p className="text-muted-foreground text-xs font-semibold">Kategori</p>
            <p className="text-sm text-foreground">{aircraft.category}</p>
          </div>
        )}

        {/* Son Görülme */}
        {aircraft.lastSeen !== undefined && (
          <div className="border-t border-border pt-3">
            <p className="text-muted-foreground text-xs font-semibold">Son Görülme</p>
            <p className="text-sm text-foreground">{aircraft.lastSeen} saniye önce</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AircraftInfo;
