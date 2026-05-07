import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge } from '../ui';
import { Search } from 'lucide-react';

const mockDamages = [
  { id: 'REP-1023', bikeId: 'BK-002', user: '2023-12345', issue: 'Flat tire on the rear wheel',        status: 'Pending',     date: '2026-05-06T08:15:00', priority: 'High' },
  { id: 'REP-1022', bikeId: 'BK-015', user: 'FAC-0012',   issue: 'Brakes are squeaking loudly',        status: 'In Progress', date: '2026-05-05T14:30:00', priority: 'Medium' },
  { id: 'REP-1021', bikeId: 'BK-008', user: '2024-11111', issue: 'Seat adjustment lever is broken',    status: 'Resolved',    date: '2026-05-04T09:45:00', priority: 'Low' },
  { id: 'REP-1020', bikeId: 'BK-021', user: '2022-98765', issue: 'Chain fell off during ride',         status: 'Pending',     date: '2026-05-03T16:20:00', priority: 'High' },
];

const statusCounts = {
  Pending:     mockDamages.filter((r) => r.status === 'Pending').length,
  'In Progress': mockDamages.filter((r) => r.status === 'In Progress').length,
  Resolved:    mockDamages.filter((r) => r.status === 'Resolved').length + 13, // includes older resolved
};

export function AdminDamage() {
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredReports = mockDamages.filter(
    (r) => filterStatus === 'All' || r.status === filterStatus,
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Damage Reports</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Review and manage reported bicycle maintenance issues.
        </p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4">
        {(
          [
            { label: 'Pending',     count: statusCounts.Pending,     accent: 'text-red-600',   bg: 'bg-red-50',   border: 'border-red-100' },
            { label: 'In Progress', count: statusCounts['In Progress'], accent: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
            { label: 'Resolved',    count: statusCounts.Resolved,    accent: 'text-green-700', bg: 'bg-green-50', border: 'border-green-100' },
          ] as const
        ).map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setFilterStatus(filterStatus === s.label ? 'All' : s.label)}
            className={`rounded-xl border p-4 text-left transition-all duration-150 cursor-pointer hover:shadow-sm ${
              filterStatus === s.label ? `${s.bg} ${s.border}` : 'bg-card border-border'
            }`}
          >
            <p className={`text-2xl font-bold ${s.accent} leading-none`}>{s.count}</p>
            <p className="text-xs font-medium text-muted-foreground mt-1.5">{s.label}</p>
          </button>
        ))}
      </div>

      <Card>
        {/* Filters */}
        <CardHeader className="px-4 pt-4 pb-3 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search report or bike ID..." className="pl-8 h-9 text-sm" />
            </div>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="sm:w-40 h-9 text-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-xs text-muted-foreground uppercase tracking-wide">
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Report</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Bike</th>
                  <th className="px-4 py-3 font-semibold">Issue</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Reported By</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Priority</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-100"
                  >
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-foreground text-sm">{report.id}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(report.date).toLocaleDateString('en-PH', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        {report.bikeId}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground max-w-[200px] truncate" title={report.issue}>
                      {report.issue}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground whitespace-nowrap font-mono">
                      {report.user}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <Badge variant={report.priority === 'High' ? 'danger' : report.priority === 'Medium' ? 'warning' : 'neutral'}>
                        {report.priority}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <Badge
                        variant={
                          report.status === 'Resolved'
                            ? 'success'
                            : report.status === 'In Progress'
                              ? 'neutral'
                              : 'warning'
                        }
                      >
                        {report.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-1.5">
                        {report.status !== 'Resolved' && (
                          <Button variant="outline" size="sm" className="h-7 px-2.5 text-xs">
                            Update
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-7 px-2.5 text-xs">
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredReports.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                      No damage reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
