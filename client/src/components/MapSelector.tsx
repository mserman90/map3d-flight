import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapSelectorProps {
  onBoundsChange?: (bounds: { north: number; south: number; east: number; west: number }) => void;
  onCenterChange?: (center: { lat: number; lon: number }) => void;
}

export const MapSelector: React.FC<MapSelectorProps> = ({
  onBoundsChange,
  onCenterChange,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const drawingRef = useRef<L.Rectangle | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<L.LatLng | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Harita oluştur
    const map = L.map(mapRef.current).setView([39.9334, 32.8597], 6); // Türkiye merkezi

    // OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Harita sınırları değiştiğinde callback çalıştır
    const handleMoveEnd = () => {
      const bounds = map.getBounds();
      if (onBoundsChange) {
        onBoundsChange({
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest(),
        });
      }
    };

    map.on('moveend', handleMoveEnd);
    map.on('zoomend', handleMoveEnd);

    // Başlangıç bounds'unu gönder
    handleMoveEnd();

    return () => {
      map.off('moveend', handleMoveEnd);
      map.off('zoomend', handleMoveEnd);
      map.remove();
    };
  }, [onBoundsChange, onCenterChange]);

  // Dikdörtgen çizme fonksiyonları
  const handleMouseDown = (e: L.LeafletMouseEvent) => {
    if (!mapInstanceRef.current) return;

    // Eski dikdörtgeni kaldır
    if (drawingRef.current) {
      mapInstanceRef.current.removeLayer(drawingRef.current);
      drawingRef.current = null;
    }

    setIsDrawing(true);
    setStartPoint(e.latlng);
  };

  const handleMouseMove = (e: L.LeafletMouseEvent) => {
    if (!isDrawing || !startPoint || !mapInstanceRef.current) return;

    // Eski dikdörtgeni kaldır
    if (drawingRef.current) {
      mapInstanceRef.current.removeLayer(drawingRef.current);
    }

    // Yeni dikdörtgen çiz
    const bounds = L.latLngBounds(startPoint, e.latlng);
    drawingRef.current = L.rectangle(bounds, {
      color: '#06B6D4',
      weight: 2,
      opacity: 0.7,
      fill: true,
      fillColor: '#06B6D4',
      fillOpacity: 0.1,
    }).addTo(mapInstanceRef.current);
  };

  const handleMouseUp = (e: L.LeafletMouseEvent) => {
    if (!isDrawing || !startPoint || !mapInstanceRef.current) return;

    setIsDrawing(false);

    // Seçilen alan bounds'unu al
    const bounds = L.latLngBounds(startPoint, e.latlng);

    if (onBoundsChange) {
      onBoundsChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      });
    }

    setStartPoint(null);
  };

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    map.on('mousedown', handleMouseDown);
    map.on('mousemove', handleMouseMove);
    map.on('mouseup', handleMouseUp);

    return () => {
      map.off('mousedown', handleMouseDown);
      map.off('mousemove', handleMouseMove);
      map.off('mouseup', handleMouseUp);
    };
  }, [isDrawing, startPoint]);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm text-muted-foreground">
        <p>💡 İpucu: Haritada dikdörtgen çizerek bölge seçin veya haritayı kaydırarak bölgeyi değiştirin</p>
      </div>
      <div
        ref={mapRef}
        className="w-full h-96 rounded-lg border border-border shadow-md"
        style={{ zIndex: 10 }}
      />
    </div>
  );
};

export default MapSelector;
