import React, { useEffect, useState } from 'react';
import { Button, Card } from '../ui';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useAppContext } from '../../context';
import { LocateFixed, Search } from 'lucide-react';
import { dlsudCampusBounds, dlsudCampusGeofence } from '../../campusMap';

const dockedIcon = L.divIcon({
  className: '',
  html: "<div style='background:#166534;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.3)'></div>",
  iconSize: [14, 14],
});
const inUseIcon = L.divIcon({
  className: '',
  html: "<div style='background:#1d4ed8;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.3)'></div>",
  iconSize: [14, 14],
});
const unavailableIcon = L.divIcon({
  className: '',
  html: "<div style='background:#9ca3af;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.3)'></div>",
  iconSize: [14, 14],
});

const stationMarkers = [
  { name: 'JFH Kubo Station', position: [14.321384152364715, 120.9630291049015] as [number, number] },
  { name: 'CBAA Station',     position: [14.323954845683534, 120.95844338120529] as [number, number] },
];

function FitGeofenceOnLoad() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(dlsudCampusBounds, { padding: [24, 24] });
  }, [map]);
  return null;
}

function AutoCenterButton() {
  const map = useMap();
  return (
    <div className="pointer-events-none absolute right-3 top-3 z-[1000]">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="pointer-events-auto bg-white/95 shadow-sm backdrop-blur gap-1.5"
        onClick={() => map.fitBounds(dlsudCampusBounds, { padding: [24, 24] })}
      >
        <LocateFixed className="h-3.5 w-3.5" />
        Center
      </Button>
    </div>
  );
}

export function AdminTracking() {
  const { bikes } = useAppContext();
  const [selectedBike, setSelectedBike] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filteredBikes = bikes.filter((b) =>
    b.id.toLowerCase().includes(query.toLowerCase())
  );

  const statusColor: Record<string, string> = {
    Docked:      'bg-green-100 text-green-800',
    'In-Use':    'bg-blue-100 text-blue-800',
    Unavailable: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">GPS Tracking</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Live monitor of all fleet assets inside the DLSU-D campus map.
        </p>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Bike list panel */}
        <Card className="flex h-full w-64 flex-col overflow-hidden flex-shrink-0">
          {/* Search */}
          <div className="border-b border-border p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bike ID..."
                className="w-full rounded-md border border-border bg-muted/30 py-1.5 pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Bike cards */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredBikes.map((bike) => (
              <button
                key={bike.id}
                type="button"
                onClick={() => setSelectedBike(bike.id === selectedBike ? null : bike.id)}
                className={`w-full text-left rounded-lg border px-3 py-2.5 transition-all duration-150 cursor-pointer ${
                  selectedBike === bike.id
                    ? 'border-primary bg-accent shadow-xs'
                    : 'border-border hover:border-border/80 hover:bg-muted/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-foreground text-sm">{bike.id}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor[bike.status]}`}>
                    {bike.status}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {bike.rider ? `Rider: ${bike.rider}` : bike.station || 'Moving'}
                </div>
              </button>
            ))}
            {filteredBikes.length === 0 && (
              <p className="text-center text-xs text-muted-foreground py-6">No bikes found.</p>
            )}
          </div>

          {/* Fleet summary footer */}
          <div className="border-t border-border px-3 py-2.5 bg-muted/20 flex gap-3 text-xs text-muted-foreground">
            <span className="font-medium">{bikes.filter((b) => b.status === 'Docked').length} docked</span>
            <span>&middot;</span>
            <span className="font-medium">{bikes.filter((b) => b.status === 'In-Use').length} in use</span>
            <span>&middot;</span>
            <span className="font-medium">{bikes.filter((b) => b.status === 'Unavailable').length} unavail.</span>
          </div>
        </Card>

        {/* Map */}
        <Card className="h-full flex-1 overflow-hidden p-0">
          <MapContainer
            center={dlsudCampusBounds[0]}
            zoom={16}
            zoomSnap={0.5}
            scrollWheelZoom
            className="relative"
            style={{ height: '100%', width: '100%' }}
          >
            <FitGeofenceOnLoad />
            <AutoCenterButton />
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
            <Polygon
              positions={dlsudCampusGeofence}
              pathOptions={{ color: '#166534', fillColor: '#166534', fillOpacity: 0.04, weight: 2 }}
            />
            {stationMarkers.map((station) => (
              <Marker key={station.name} position={station.position}>
                <Popup>
                  <div className="p-1">
                    <p className="text-sm font-bold">{station.name}</p>
                    <p className="text-xs text-muted-foreground">DLSU-D docking point</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            {bikes.map((bike) => (
              <Marker
                key={bike.id}
                position={bike.coordinates}
                icon={
                  bike.status === 'Docked'
                    ? dockedIcon
                    : bike.status === 'In-Use'
                      ? inUseIcon
                      : unavailableIcon
                }
              >
                <Popup>
                  <div className="min-w-[140px] p-1.5">
                    <p className="text-sm font-bold border-b border-border pb-1 mb-1.5">{bike.id}</p>
                    <p className="text-xs"><span className="font-medium text-muted-foreground">Status:</span> {bike.status}</p>
                    <p className="text-xs"><span className="font-medium text-muted-foreground">Station:</span> {bike.station}</p>
                    {bike.rider && (
                      <p className="text-xs"><span className="font-medium text-muted-foreground">Rider:</span> {bike.rider}</p>
                    )}
                    <p className="text-[11px] text-muted-foreground mt-1.5">
                      {bike.coordinates[0].toFixed(5)}, {bike.coordinates[1].toFixed(5)}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Card>
      </div>
    </div>
  );
}
