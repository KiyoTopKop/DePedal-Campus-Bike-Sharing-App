import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui';
import { useAppContext } from '../../context';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';

/* More realistic week data with rises and drops */
const weekData = [
  { day: 'Mon', savings: 0.82 },
  { day: 'Tue', savings: 1.15 },
  { day: 'Wed', savings: 0.44 },
  { day: 'Thu', savings: 1.43 },
  { day: 'Fri', savings: 0.91 },
  { day: 'Sat', savings: 0.27 },
  { day: 'Sun', savings: 0.68 },
];

/* Cumulative 4-week trend */
const monthData = [
  { week: 'W1', savings: 3.2 },
  { week: 'W2', savings: 2.1 },
  { week: 'W3', savings: 4.8 },
  { week: 'W4', savings: 3.6 },
];

const carbonFactor = 0.11;

export function Carbon() {
  const { currentUser } = useAppContext();
  if (!currentUser) return null;

  const estimatedDistance = (currentUser.carbonSaved / carbonFactor).toFixed(1);
  const treeEquivalent  = (currentUser.carbonSaved / 22).toFixed(2);
  const carEquivalent   = (currentUser.carbonSaved / 0.21).toFixed(1);
  const avgDaily = (weekData.reduce((s, d) => s + d.savings, 0) / weekData.length).toFixed(2);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Carbon Savings</h1>
        <p className="text-sm text-gray-400 mt-0.5">Your environmental impact across every DePedal ride.</p>
      </div>

      {/* Top row: KPI cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-xl border-0 bg-gradient-to-br from-emerald-600 to-green-800 text-white shadow-md p-4 col-span-2 lg:col-span-1 flex flex-col justify-between min-h-[110px]">
          <p className="text-xs font-medium text-emerald-200 uppercase tracking-widest">Total CO₂ Saved</p>
          <div>
            <p className="text-4xl font-bold tracking-tight mt-2">{currentUser.carbonSaved}</p>
            <p className="text-xs text-emerald-300 mt-1">kg CO₂e</p>
          </div>
        </div>

        {[
          { label: 'Avg/Day This Week', value: `${avgDaily} kg`, sub: 'CO₂e per ride day' },
          { label: 'Distance Estimated', value: `${estimatedDistance} km`, sub: 'Based on 0.11 kg/km' },
          { label: 'Car-km Avoided', value: `${carEquivalent} km`, sub: 'vs petrol vehicle' },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col justify-between min-h-[110px]">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{kpi.label}</p>
            <div>
              <p className="text-xl font-bold text-gray-900 mt-2 leading-tight">{kpi.value}</p>
              <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Weekly trend */}
        <Card>
          <CardHeader className="pb-1 pt-4 px-4">
            <div className="flex items-end justify-between">
              <CardTitle className="text-sm font-semibold text-gray-900">Daily Savings — This Week</CardTitle>
              <span className="text-xs text-gray-400">kg CO₂e</span>
            </div>
          </CardHeader>
          <CardContent className="pt-2 px-4 pb-4">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekData} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="weekGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <ReferenceLine y={parseFloat(avgDaily)} stroke="#d1d5db" strokeDasharray="4 4" label={{ value: 'avg', position: 'right', fill: '#9ca3af', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)', fontSize: '12px' }}
                    formatter={(v: number) => [`${v} kg CO₂e`, 'Saved']}
                  />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="#059669"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#weekGrad)"
                    dot={{ r: 3.5, fill: '#059669', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly trend */}
        <Card>
          <CardHeader className="pb-1 pt-4 px-4">
            <div className="flex items-end justify-between">
              <CardTitle className="text-sm font-semibold text-gray-900">Weekly Totals — This Month</CardTitle>
              <span className="text-xs text-gray-400">kg CO₂e</span>
            </div>
          </CardHeader>
          <CardContent className="pt-2 px-4 pb-4">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthData} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="monthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#166534" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#166534" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07)', fontSize: '12px' }}
                    formatter={(v: number) => [`${v} kg CO₂e`, 'Weekly Total']}
                  />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="#166534"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#monthGrad)"
                    dot={{ r: 3.5, fill: '#166534', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Impact equivalents — minimal table style */}
      <Card>
        <CardHeader className="pb-2 pt-4 px-4 border-b border-gray-100">
          <CardTitle className="text-sm font-semibold text-gray-900">Impact Equivalents</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {[
              { metric: 'Trees planted', value: `${treeEquivalent}`, unit: 'trees', note: '10-year growth equivalent' },
              { metric: 'Petrol car km avoided', value: carEquivalent, unit: 'km', note: 'vs 0.21 kg CO₂e/km car' },
              { metric: 'Total distance cycled', value: estimatedDistance, unit: 'km', note: 'Using 0.11 kg CO₂e/km factor' },
            ].map((row) => (
              <div key={row.metric} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{row.metric}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{row.note}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-gray-900">{row.value}</span>
                  <span className="text-xs text-gray-400 ml-1">{row.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
