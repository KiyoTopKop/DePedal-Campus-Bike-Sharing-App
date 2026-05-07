import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select } from '../ui';
import { Download } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area, ReferenceLine,
} from 'recharts';

/* Realistic 30-day usage — shows clear peaks/troughs */
const usageData = [
  { date: 'Apr 7',  rides: 48,  revenue: 240 },
  { date: 'Apr 8',  rides: 71,  revenue: 355 },
  { date: 'Apr 9',  rides: 65,  revenue: 325 },
  { date: 'Apr 10', rides: 92,  revenue: 460 },
  { date: 'Apr 11', rides: 110, revenue: 550 },
  { date: 'Apr 12', rides: 38,  revenue: 190 },
  { date: 'Apr 13', rides: 22,  revenue: 110 },
  { date: 'Apr 14', rides: 88,  revenue: 440 },
  { date: 'Apr 15', rides: 104, revenue: 520 },
  { date: 'Apr 16', rides: 95,  revenue: 475 },
  { date: 'Apr 17', rides: 130, revenue: 650 },
  { date: 'Apr 18', rides: 145, revenue: 725 },
  { date: 'Apr 19', rides: 52,  revenue: 260 },
  { date: 'Apr 20', rides: 30,  revenue: 150 },
  { date: 'Apr 21', rides: 118, revenue: 590 },
  { date: 'Apr 22', rides: 136, revenue: 680 },
  { date: 'Apr 23', rides: 99,  revenue: 495 },
  { date: 'Apr 24', rides: 155, revenue: 775 },
  { date: 'Apr 25', rides: 172, revenue: 860 },
  { date: 'Apr 26', rides: 64,  revenue: 320 },
  { date: 'Apr 27', rides: 41,  revenue: 205 },
  { date: 'Apr 28', rides: 158, revenue: 790 },
  { date: 'Apr 29', rides: 144, revenue: 720 },
  { date: 'Apr 30', rides: 120, revenue: 600 },
  { date: 'May 1',  rides: 163, revenue: 815 },
  { date: 'May 2',  rides: 185, revenue: 925 },
  { date: 'May 3',  rides: 71,  revenue: 355 },
  { date: 'May 4',  rides: 49,  revenue: 245 },
  { date: 'May 5',  rides: 177, revenue: 885 },
  { date: 'May 6',  rides: 192, revenue: 960 },
];

const stationData = [
  { station: 'JFH Kubo', departures: 320, arrivals: 310 },
  { station: 'CBAA',     departures: 250, arrivals: 265 },
];

const userDistributionData = [
  { department: 'CICS', students: 142, faculty: 12, staff: 6 },
  { department: 'CEAT', students: 121, faculty: 10, staff: 4 },
  { department: 'CBAA', students: 110, faculty: 9,  staff: 5 },
  { department: 'CLA',  students: 96,  faculty: 14, staff: 6 },
  { department: 'COS',  students: 84,  faculty: 8,  staff: 3 },
];

/* Summary metric sparklines with rises and drops */
const ridesSpark   = [{ v: 620 }, { v: 710 }, { v: 660 }, { v: 795 }, { v: 740 }, { v: 810 }, { v: 825 }];
const topupSpark   = [{ v: 3400 }, { v: 3800 }, { v: 3550 }, { v: 4100 }, { v: 3900 }, { v: 4200 }, { v: 4250 }];
const penaltySpark = [{ v: 90 }, { v: 115 }, { v: 105 }, { v: 130 }, { v: 120 }, { v: 138 }, { v: 135 }];
const carbonSpark  = [{ v: 165 }, { v: 180 }, { v: 172 }, { v: 195 }, { v: 188 }, { v: 202 }, { v: 202 }];

const summaryMetrics = [
  { label: 'Total Rides',    value: '825',       spark: ridesSpark,   color: '#166534' },
  { label: 'Total Top-ups',  value: '₱4,250',    spark: topupSpark,   color: '#1d4ed8' },
  { label: 'Total Penalties', value: '₱135',     spark: penaltySpark, color: '#b45309' },
  { label: 'CO₂ Saved',      value: '202.1 kg',  spark: carbonSpark,  color: '#0f766e' },
];

/* Shared chart config */
const tooltipStyle = {
  borderRadius: '6px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
  fontSize: '11px',
};

const axisStyle = { fill: '#94a3b8', fontSize: 11 };

function MiniSparkline({ data, color }: { data: { v: number }[]; color: string }) {
  return (
    <div style={{ width: '100%', height: 32 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`rg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={color} stopOpacity={0.16} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#rg-${color.replace('#','')})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AdminReports() {
  const [reportType, setReportType] = useState('monthly');

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Report Generation</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Export analytics and system data for review.</p>
        </div>
        <Button size="sm" className="shrink-0 gap-2">
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {/* Config panel */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Configuration</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Date Range</label>
              <Select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="h-9 text-sm"
              >
                <option value="today">Today</option>
                <option value="weekly">This Week</option>
                <option value="monthly">This Month</option>
                <option value="yearly">This Year</option>
                <option value="custom">Custom Range</option>
              </Select>
            </div>

            {reportType === 'custom' && (
              <div className="space-y-2">
                <Input type="date" className="h-9 text-sm w-full" />
                <div className="text-center text-xs text-muted-foreground">to</div>
                <Input type="date" className="h-9 text-sm w-full" />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Metric Type</label>
              <Select className="h-9 text-sm">
                <option value="all">All Metrics</option>
                <option value="usage">Usage &amp; Rides</option>
                <option value="revenue">Financial / Revenue</option>
                <option value="carbon">Carbon Savings</option>
                <option value="maintenance">Maintenance</option>
              </Select>
            </div>

            <Button className="w-full" variant="outline" size="sm">
              Generate Preview
            </Button>
          </CardContent>
        </Card>

        {/* Charts area */}
        <div className="space-y-5 md:col-span-3">
          {/* Summary metric cards */}
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {summaryMetrics.map((metric) => (
              <Card key={metric.label} className="overflow-hidden">
                <CardContent className="px-4 pt-4 pb-2">
                  <p className="text-xs font-medium text-muted-foreground truncate">{metric.label}</p>
                  <p className="text-xl font-bold text-foreground tracking-tight mt-1.5 leading-none">
                    {metric.value}
                  </p>
                </CardContent>
                <div className="px-0 pb-0">
                  <MiniSparkline data={metric.spark} color={metric.color} />
                </div>
              </Card>
            ))}
          </div>

          {/* Daily Rides & Revenue — 30-day view */}
          <Card>
            <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
              <div className="flex items-end justify-between">
                <CardTitle className="text-sm font-semibold text-foreground">Daily Rides &amp; Revenue</CardTitle>
                <span className="text-xs text-muted-foreground">Apr 7 – May 6</span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={axisStyle}
                      interval={4}
                    />
                    <YAxis yAxisId="left"  axisLine={false} tickLine={false} tick={axisStyle} width={30} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={axisStyle} width={40} tickFormatter={(v) => `₱${v}`} />
                    <RechartsTooltip contentStyle={tooltipStyle} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="rides"
                      name="Rides"
                      stroke="#166534"
                      strokeWidth={1.5}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue (₱)"
                      stroke="#b45309"
                      strokeWidth={1.5}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* User Distribution + Station Activity — side by side */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {/* User Distribution */}
            <Card>
              <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
                <CardTitle className="text-sm font-semibold text-foreground">Users by Department</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userDistributionData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="department" axisLine={false} tickLine={false} tick={axisStyle} />
                      <YAxis axisLine={false} tickLine={false} tick={axisStyle} width={28} />
                      <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Bar dataKey="students" name="Students" stackId="a" fill="#166534" />
                      <Bar dataKey="faculty"  name="Faculty"  stackId="a" fill="#4ade80" />
                      <Bar dataKey="staff"    name="Staff"    stackId="a" fill="#bbf7d0" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Station Activity */}
            <Card>
              <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
                <CardTitle className="text-sm font-semibold text-foreground">Station Departures &amp; Arrivals</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-52 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stationData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="station" axisLine={false} tickLine={false} tick={axisStyle} />
                      <YAxis axisLine={false} tickLine={false} tick={axisStyle} width={28} />
                      <RechartsTooltip cursor={{ fill: '#f8fafc' }} contentStyle={tooltipStyle} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Bar dataKey="departures" name="Departures" fill="#166534" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="arrivals"   name="Arrivals"   fill="#4ade80" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
