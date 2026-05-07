import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Label, Input } from '../ui';
import { useAppContext } from '../../context';

export function AdminSettings() {
  const { settings, setSettings } = useAppContext();
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">System Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Configure global parameters. Changes take effect immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* Left: config + changelog */}
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold text-foreground">Pricing &amp; Policies</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <form onSubmit={handleSave} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="ridePrice" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Ride Price per Session
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">₱</span>
                      <Input
                        id="ridePrice"
                        type="number"
                        step="0.5"
                        min="0"
                        className="pl-7 h-9"
                        value={formData.ridePrice}
                        onChange={(e) => setFormData({ ...formData, ridePrice: Number(e.target.value) })}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Base price for a 15-minute ride session.</p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="penaltyRate" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Penalty Rate
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">₱</span>
                      <Input
                        id="penaltyRate"
                        type="number"
                        step="0.5"
                        min="0"
                        className="pl-7 h-9"
                        value={formData.penaltyRate}
                        onChange={(e) => setFormData({ ...formData, penaltyRate: Number(e.target.value) })}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Fee charged per 15 minutes of overtime.</p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="minBalance" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Minimum Balance
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">₱</span>
                      <Input
                        id="minBalance"
                        type="number"
                        step="0.5"
                        min="0"
                        className="pl-7 h-9"
                        value={formData.minBalance}
                        onChange={(e) => setFormData({ ...formData, minBalance: Number(e.target.value) })}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Required wallet balance to unlock a bicycle.</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center gap-4">
                  <Button type="submit" size="sm">
                    Save Configuration
                  </Button>
                  {saved && (
                    <p className="text-sm font-medium text-green-700">
                      Settings saved successfully.
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Change log */}
          <Card>
            <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold text-foreground">Change Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  {
                    admin: 'admin',
                    action: 'Updated Pricing & Policies',
                    detail: 'Changed Minimum Balance from ₱10 to ₱5',
                    date: 'May 1, 2026 14:30',
                  },
                  {
                    admin: 'admin',
                    action: 'Updated Pricing & Policies',
                    detail: 'Changed Penalty Rate from ₱10 to ₱5',
                    date: 'Apr 25, 2026 10:15',
                  },
                  {
                    admin: 'admin',
                    action: 'Updated Pricing & Policies',
                    detail: 'Initial system setup',
                    date: 'Apr 20, 2026 09:00',
                  },
                ].map((entry, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 px-4 py-3.5">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Admin ({entry.admin})</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{entry.action} — {entry.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">{entry.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: system policy reference */}
        <div className="space-y-5 lg:col-span-1">
          {/* Top-up packages */}
          <Card>
            <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold text-foreground">Top-Up Packages</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  { pkg: 'Basic',    amount: '₱5',  rides: '1 ride' },
                  { pkg: 'Standard', amount: '₱25', rides: '5 rides' },
                  { pkg: 'Value',    amount: '₱50', rides: '10 rides — initial activation' },
                ].map((row) => (
                  <div key={row.pkg} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{row.pkg}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{row.rides}</p>
                    </div>
                    <span className="text-sm font-bold text-foreground">{row.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Penalty policy */}
          <Card>
            <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold text-foreground">Penalty Policy</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[
                  { label: 'Geofence exit',       consequence: 'Penalty deduction + alarm + admin alert' },
                  { label: 'First offense',        consequence: '1-week to 1-month ID ban' },
                  { label: 'Repeated offense',     consequence: 'Permanent ID ban' },
                  { label: 'Damage / loss',        consequence: 'Payment for hardware replacement' },
                  { label: 'Intentional damage',   consequence: 'SWAFO report + 2× hardware price' },
                ].map((row) => (
                  <div key={row.label} className="px-4 py-3">
                    <p className="text-xs font-semibold text-foreground">{row.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{row.consequence}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Carbon formula reference */}
          <Card>
            <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
              <CardTitle className="text-sm font-semibold text-foreground">Carbon Formula</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                CO₂ savings are estimated using:
              </p>
              <p className="text-sm font-bold text-foreground mt-2 font-mono">
                Distance (km) × 0.11 kg CO₂e/km
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Source: Harvie (2021) via StepCount Carbon Calculator. This is an estimation — not a direct measurement.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
