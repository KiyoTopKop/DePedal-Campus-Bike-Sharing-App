import React, { useState } from 'react';
import { Card, CardContent, Button, Input, Select, Badge } from '../ui';
import { Download, Search } from 'lucide-react';

const mockLogs = [
  { txId: 'TX-1001', studentId: '2023-12345', email: 'jdc1234@dlsud.edu.ph', bike: 'BK-001', dep: 'JFH Kubo', arr: 'CBAA',     duration: '12 min', cost: 5, penalty: 0, violation: false, date: '2026-05-05 09:00' },
  { txId: 'TX-1002', studentId: '2021-54321', email: 'abc5432@dlsud.edu.ph', bike: 'BK-003', dep: 'CBAA',    arr: 'JFH Kubo', duration: '14 min', cost: 5, penalty: 0, violation: false, date: '2026-05-05 10:15' },
  { txId: 'TX-1003', studentId: '2022-98765', email: 'xyz9876@dlsud.edu.ph', bike: 'BK-002', dep: 'JFH Kubo', arr: 'CBAA',     duration: '20 min', cost: 5, penalty: 5, violation: false, date: '2026-05-05 11:30' },
  { txId: 'TX-1004', studentId: '2024-11111', email: 'qwe1111@dlsud.edu.ph', bike: 'BK-004', dep: 'CBAA',    arr: 'CBAA',     duration: '8 min',  cost: 5, penalty: 0, violation: true,  date: '2026-05-05 13:00' },
];

export function AdminLogs() {
  const [studentQuery, setStudentQuery] = useState('');
  const [bikeQuery, setBikeQuery]       = useState('');
  const [station, setStation]           = useState('All');
  const [dateFilter, setDateFilter]     = useState('');

  const filtered = mockLogs.filter((log) => {
    const matchStudent = log.studentId.includes(studentQuery) || log.email.includes(studentQuery);
    const matchBike    = log.bike.toLowerCase().includes(bikeQuery.toLowerCase());
    const matchStation = station === 'All' || log.dep === station || log.arr === station;
    const matchDate    = !dateFilter || log.date.startsWith(dateFilter);
    return matchStudent && matchBike && matchStation && matchDate;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Transaction Logs</h1>
          <p className="text-sm text-muted-foreground mt-0.5">History of all rides and financial records.</p>
        </div>
        <Button size="sm" className="gap-2 shrink-0">
          <Download className="w-3.5 h-3.5" />
          Export PDF
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Filter bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 border-b border-border bg-muted/20">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Student ID or email..."
                className="pl-8 h-9 text-xs"
                value={studentQuery}
                onChange={(e) => setStudentQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Bike ID..."
                className="pl-8 h-9 text-xs"
                value={bikeQuery}
                onChange={(e) => setBikeQuery(e.target.value)}
              />
            </div>
            <Select
              className="h-9 text-xs"
              value={station}
              onChange={(e) => setStation(e.target.value)}
            >
              <option value="All">All Stations</option>
              <option value="JFH Kubo">JFH Kubo</option>
              <option value="CBAA">CBAA</option>
            </Select>
            <Input
              type="date"
              className="h-9 text-xs"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Tx ID / Date</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">User</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Route / Bike</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right whitespace-nowrap">Duration</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-right whitespace-nowrap">Cost</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-center whitespace-nowrap">Flags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((log) => (
                  <tr key={log.txId} className="bg-card hover:bg-muted/20 transition-colors duration-100">
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-semibold text-foreground text-sm">{log.txId}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">{log.date}</div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-semibold text-foreground text-sm">{log.studentId}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">{log.email}</div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="text-foreground text-sm font-medium">{log.dep} &rarr; {log.arr}</div>
                      <span className="mt-1 inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        {log.bike}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-right text-foreground font-medium text-sm">
                      {log.duration}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-right">
                      <div className="font-bold text-foreground text-sm">₱{log.cost.toFixed(2)}</div>
                      {log.penalty > 0 && (
                        <div className="text-red-600 text-xs mt-0.5">+₱{log.penalty.toFixed(2)} penalty</div>
                      )}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-center">
                      <div className="flex flex-col gap-1 items-center">
                        {log.penalty > 0 && <Badge variant="warning">Overtime</Badge>}
                        {log.violation && <Badge variant="danger">Geofence</Badge>}
                        {log.penalty === 0 && !log.violation && (
                          <span className="text-muted-foreground/40 text-xs">&mdash;</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                      No transactions match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground bg-muted/10">
            <span>Showing {filtered.length} of {mockLogs.length} entries</span>
            <div className="flex gap-1">
              <button
                className="px-2.5 py-1 border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-40 cursor-pointer"
                disabled
              >
                Prev
              </button>
              <button className="px-2.5 py-1 border border-primary bg-primary text-primary-foreground rounded-md font-semibold">
                1
              </button>
              <button className="px-2.5 py-1 border border-border rounded-md hover:bg-muted transition-colors cursor-pointer">
                Next
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
