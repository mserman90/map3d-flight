import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AircraftScene } from '@/components/AircraftScene';
import { AircraftInfo } from '@/components/AircraftInfo';
import { useAircraftStore } from '@/stores/aircraftStore';
import { Link } from 'wouter';
import { MapPin, Plane, Eye, EyeOff, RotateCcw } from 'lucide-react';

export default function Radar() {
  const { selectedAircraft, setSelectedAircraft, showTrails, setShowTrails, clearTrails } =
    useAircraftStore();
  const [bounds, setBounds] = useState<
    | { north: number; south: number; east: number; west: number }
    | undefined
  >(undefined);

  const handleClearTrails = () => {
    clearTrails();
  };

  const handleResetView = () => {
    setSelectedAircraft(null);
    setBounds(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">Map3D</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Özellikler
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 relative">
        {/* 3D Scene */}
        <div className="w-full h-full">
          <AircraftScene bounds={bounds || undefined} />
        </div>

        {/* Control Panel */}
        <div className="absolute top-4 right-4 z-40">
          <Card className="w-64 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-accent" />
                Kontrol Paneli
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Trail Toggle */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTrails}
                    onChange={(e) => setShowTrails(e.target.checked)}
                    className="w-4 h-4"
                  />
                  Uçuş İzlerini Göster
                </label>
              </div>

              {/* Clear Trails Button */}
              {showTrails && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearTrails}
                  className="w-full"
                >
                  İzleri Temizle
                </Button>
              )}

              {/* Reset View Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetView}
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Görünümü Sıfırla
              </Button>

              {/* Info */}
              <div className="border-t border-border pt-3 text-xs text-muted-foreground space-y-2">
                <p>
                  <strong>Kaynaklar:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>adsb.lol (Birincil)</li>
                  <li>ADSBExchange (Yedek)</li>
                </ul>
                <p className="pt-2">
                  <strong>İpucu:</strong> Uçağa tıklayarak bilgilerini görüntüleyin.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Aircraft Info Panel */}
        <AircraftInfo
          aircraft={selectedAircraft}
          onClose={() => setSelectedAircraft(null)}
        />

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-40">
          <Card className="w-48 shadow-xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Açıklamalar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Normal Uçak</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span>Seçili Uçak</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-accent/50"></div>
                <span>Uçuş İzi</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
