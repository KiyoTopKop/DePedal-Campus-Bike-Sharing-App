import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAppContext } from '../../context';
import { dlsudCampusBounds, dlsudCampusCenter, dlsudCampusGeofence } from '../../campusMap';
import {
  AreaChart, Area, ResponsiveContainer, Tooltip,
} from 'recharts';

/* ── Leaflet icons ── */
const dockedIcon = L.divIcon({
  className: '',
  html: "<div style='background:#166534;width:11px;height:11px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)'></div>",
  iconSize: [11, 11],
});
const inUseIcon = L.divIcon({
  className: '',
  html: "<div style='background:#1d4ed8;width:11px;height:11px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)'></div>",
  iconSize: [11, 11],
});
const unavailableIcon = L.divIcon({
  className: '',
  html: "<div style='background:#9ca3af;width:11px;height:11px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)'></div>",
  iconSize: [11, 11],
});
const stationIcon = L.divIcon({
  className: '',
  html: "<div style='background:#166534;width:14px;height:14px;border-radius:3px;border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.35);transform:rotate(45deg)'></div>",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const stationMarkers = [
  { name: 'JFH Kubo Station', position: [14.321384152364715, 120.9630291049015] as [number, number] },
  { name: 'CBAA Station',     position: [14.323954845683534, 120.95844338120529] as [number, number] },
];

/* ── Sparkline data (7-day with realistic rises & drops) ── */
const rideSpark   = [{ v: 62 }, { v: 78 }, { v: 55 }, { v: 91 }, { v: 74 }, { v: 83 }, { v: 86 }];
const userSpark   = [{ v: 1190 }, { v: 1210 }, { v: 1205 }, { v: 1222 }, { v: 1218 }, { v: 1235 }, { v: 1248 }];
const fundSpark   = [{ v: 280 }, { v: 340 }, { v: 190 }, { v: 410 }, { v: 290 }, { v: 360 }, { v: 430 }];
const carbonSpark = [{ v: 130 }, { v: 138 }, { v: 133 }, { v: 140 }, { v: 137 }, { v: 141 }, { v: 142 }];

/* ── Stat card config ── */
const stats = [
  {
    label:    'Registered Users',
    value:    '1,248',
    change:   '+12 this week',
    positive: true,
    spark:    userSpark,
    color:    '#166534',
  },
  {
    label:    "Today's Rides",
    value:    '86',
    change:   '+24% vs yesterday',
    positive: true,
    spark:    rideSpark,
    color:    '#1d4ed8',
  },
  {
    label:    'Top-up Today',
    value:    '₱430',
    change:   'From 14 reloads',
    positive: true,
    spark:    fundSpark,
    color:    '#b45309',
  },
  {
    label:    'Total CO\u2082 Saved',
    value:    '142 kg',
    change:   '+2.4 kg today',
    positive: true,
    spark:    carbonSpark,
    color:    '#0f766e',
  },
];

/* ── Recent alerts ── */
const alerts = [
  {
    severity: 'warning',
    title:    'Maintenance Check: BK-004',
    detail:   'Unavailable at CBAA station, queued for inspection.',
    time:     '10 min ago',
  },
  {
    severity: 'danger',
    title:    'Geofence Alert: BK-003',
    detail:   'Approaching DLSU-D campus perimeter near Gate 1.',
    time:     '25 min ago',
  },
  {
    severity: 'info',
    title:    'New Damage Report',
    detail:   'BK-002 reported for flat tire by 2023-12345.',
    time:     '1 hour ago',
  },
];

const severityDot: Record<string, string> = {
  warning: 'bg-amber-500',
  danger:  'bg-red-500',
  info:    'bg-blue-500',
};

/* ── Inline sparkline ── */
function Sparkline({ data, color }: { data: { v: number }[]; color: string }) {
  return (
    <div style={{ width: '100%', height: 40 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={color} stopOpacity={0.18} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            content={({ active, payload }) =>
              active && payload?.length ? (
                <div className="rounded-md border border-border bg-card px-2 py-1 text-xs font-medium shadow-sm">
                  {payload[0].value}
                </div>
              ) : null
            }
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#sg-${color.replace('#','')})`}
            dot={false}
            activeDot={{ r: 3, fill: color, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AdminDashboard() {
  const { bikes } = useAppContext();

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          System overview and real-time status — DLSU-D Campus.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="overflow-hidden">
            <CardContent className="px-4 pt-4 pb-2">
              <p className="text-xs font-medium text-muted-foreground mb-2 truncate">{s.label}</p>
              <p className="text-2xl font-bold text-foreground tracking-tight leading-none">
                {s.value}
              </p>
              <p className={`text-xs font-medium mt-1.5 ${s.positive ? 'text-green-700' : 'text-red-600'}`}>
                {s.change}
              </p>
            </CardContent>
            <div className="px-0 pb-0">
              <Sparkline data={s.spark} color={s.color} />
            </div>
          </Card>
        ))}
      </div>

      {/* Map + Alerts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Map */}
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader className="px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-foreground">
                Real-Time Map Overview
              </CardTitle>
              <span className="text-xs text-muted-foreground">DLSU-D Campus</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative z-0 h-[340px] overflow-hidden">
              <MapContainer
                center={dlsudCampusCenter}
                bounds={dlsudCampusBounds}
                maxBounds={dlsudCampusBounds}
                zoom={18.5}
                zoomSnap={0.5}
                scrollWheelZoom
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                />
                <Polygon
                  positions={dlsudCampusGeofence}
                  pathOptions={{ color: '#166534', fillColor: '#166534', fillOpacity: 0.05, weight: 2, dashArray: '5, 5' }}
                />
                {stationMarkers.map((station) => (
                  <Marker key={station.name} position={station.position} icon={stationIcon}>
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
                      <div className="p-1">
                        <p className="text-sm font-bold">{bike.id}</p>
                        <p className="text-xs text-muted-foreground">Status: {bike.status}</p>
                        <p className="text-xs text-muted-foreground">Station: {bike.station}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Map legend */}
            <div className="px-4 py-2.5 border-t border-border flex flex-wrap items-center gap-4 text-xs text-muted-foreground bg-muted/30">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#166534]" /> Docked
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#1d4ed8]" /> In Use
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-gray-400" /> Unavailable
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                <div className="h-0.5 w-4 border-t-2 border-dashed border-[#166534]" /> Geofence
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader className="px-4 py-3 border-b border-border">
            <CardTitle className="text-sm font-semibold text-foreground">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3.5">
                  <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${severityDot[alert.severity]}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-snug">{alert.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{alert.detail}</p>
                    <p className="text-[11px] text-muted-foreground/70 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
