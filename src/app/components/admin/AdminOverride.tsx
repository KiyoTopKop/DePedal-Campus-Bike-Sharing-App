import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Label, Input } from '../ui';
import { AlertTriangle } from 'lucide-react';
import { useAppContext } from '../../context';

const overrideLog = [
  { id: 'OV-014', admin: 'admin', student: '2023-12345', bikeId: 'BK-001', station: 'JFH Kubo', date: 'May 6, 2026 09:42', reason: 'Scanner malfunction' },
  { id: 'OV-013', admin: 'admin', student: 'FAC-0012',   bikeId: 'BK-002', station: 'CBAA',     date: 'May 4, 2026 14:15', reason: 'Low balance exception' },
  { id: 'OV-012', admin: 'admin', student: '2022-98765', bikeId: 'BK-001', station: 'JFH Kubo', date: 'Apr 30, 2026 11:08', reason: 'Hardware failure' },
];

export function AdminOverride() {
  const { bikes, setBikes } = useAppContext();
  const [selectedSlot, setSelectedSlot] = useState<{ bikeId: string; station: string; slot: number } | null>(null);
  const [studentId, setStudentId] = useState('');

  const handleOverride = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !studentId) return;

    setBikes(bikes.map((bike) =>
      bike.id === selectedSlot.bikeId
        ? { ...bike, status: 'In-Use' as const, rider: studentId, slot: undefined }
        : bike,
    ));
    setSelectedSlot(null);
    setStudentId('');
  };

  const dockedBikes = bikes.filter((bike) => bike.status === 'Docked');

  function StationCard({ stationName, slots }: { stationName: string; slots: number[] }) {
    return (
      <Card>
        <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
          <CardTitle className="text-sm font-semibold text-foreground">{stationName}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 space-y-2">
          {slots.map((slotNum) => {
            const bike = dockedBikes.find(
              (item) => item.station === stationName && item.slot === slotNum,
            );
            return (
              <div
                key={`${stationName}-${slotNum}`}
                className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-secondary-foreground flex-shrink-0">
                    S{slotNum}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">
                        {bike ? bike.id : 'Empty'}
                      </span>
                      <Badge variant={bike ? 'success' : 'neutral'} className="text-[10px] py-0">
                        {bike ? 'Locked' : 'Available'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {bike ? `Slot ${slotNum} occupied` : 'No bike detected'}
                    </p>
                  </div>
                </div>
                {bike && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs gap-1.5 border-border hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setSelectedSlot({ bikeId: bike.id, station: stationName, slot: slotNum })}
                  >
                    Force Unlock
                  </Button>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Manual Override</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Force unlock docking stations and bypass barcode authentication.
        </p>
      </div>

      {/* Warning banner */}
      <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3.5">
        <AlertTriangle className="h-4 w-4 flex-shrink-0 text-amber-600 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Use with caution</p>
          <p className="text-sm text-amber-700 mt-0.5">
            Manual overrides are logged and audited. A valid Student ID is required to record the ride.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Station cards — take 2 cols */}
        <div className="space-y-4 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <StationCard stationName="JFH Kubo" slots={[1, 2]} />
            <StationCard stationName="CBAA" slots={[1, 2]} />
          </div>

          {/* Override audit log */}
          <Card>
            <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold text-foreground">Override Audit Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/30 text-xs text-muted-foreground uppercase tracking-wide">
                      <th className="px-4 py-2.5 font-semibold">ID</th>
                      <th className="px-4 py-2.5 font-semibold">Rider</th>
                      <th className="px-4 py-2.5 font-semibold">Bike</th>
                      <th className="px-4 py-2.5 font-semibold">Station</th>
                      <th className="px-4 py-2.5 font-semibold">Reason</th>
                      <th className="px-4 py-2.5 font-semibold whitespace-nowrap">Date &amp; Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overrideLog.map((log) => (
                      <tr key={log.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-100">
                        <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{log.id}</td>
                        <td className="px-4 py-3 text-sm font-medium text-foreground">{log.student}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{log.bikeId}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{log.station}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{log.reason}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{log.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: override policy + station info */}
        <div className="space-y-4 lg:col-span-1">
          <Card>
            <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold text-foreground">Override Policy</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  { rule: 'Authorized use only', detail: 'Only admin accounts can execute force unlocks' },
                  { rule: 'Rider ID required', detail: 'A valid Student/Faculty/Staff ID must be provided' },
                  { rule: 'Always logged', detail: 'Every override is recorded with admin, rider, and timestamp' },
                  { rule: 'Ride fee applies', detail: '₱5 will be deducted from the provided rider account' },
                  { rule: 'Justification scope', detail: 'Use only for scanner failure or hardware malfunction' },
                ].map((row) => (
                  <div key={row.rule} className="px-4 py-3">
                    <p className="text-xs font-semibold text-foreground">{row.rule}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{row.detail}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold text-foreground">Station Reference</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  { station: 'JFH Kubo', location: 'Main Gate Area', slots: 2, bikes: dockedBikes.filter(b => b.station === 'JFH Kubo').length },
                  { station: 'CBAA',     location: 'Near Oval / CBAA Grounds', slots: 2, bikes: dockedBikes.filter(b => b.station === 'CBAA').length },
                ].map((s) => (
                  <div key={s.station} className="flex items-start justify-between px-4 py-3.5">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{s.station}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{s.bikes}/{s.slots}</p>
                      <p className="text-xs text-muted-foreground">bikes docked</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirm modal */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <Card className="w-full max-w-sm shadow-xl animate-in zoom-in-95 duration-200">
            <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                <CardTitle className="text-sm font-semibold text-foreground">
                  Confirm Force Unlock
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <form onSubmit={handleOverride} className="space-y-4">
                <div className="rounded-lg bg-muted/40 border border-border p-3 text-sm space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Station</span>
                    <span className="font-medium text-foreground">
                      {selectedSlot.station} — Slot {selectedSlot.slot}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bicycle</span>
                    <span className="font-medium text-foreground">{selectedSlot.bikeId}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="studentId" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Rider Student ID
                  </Label>
                  <Input
                    id="studentId"
                    required
                    placeholder="e.g. 2023-12345"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="h-9"
                  />
                  <p className="text-xs text-muted-foreground">This ID will be charged for the ride session.</p>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <Button type="button" variant="outline" size="sm" onClick={() => setSelectedSlot(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="danger" size="sm">
                    Execute Override
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
