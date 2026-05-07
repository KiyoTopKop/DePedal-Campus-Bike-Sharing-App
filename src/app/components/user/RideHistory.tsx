import React from 'react';
import { Card, CardContent, Badge, Select } from '../ui';

const mockHistory = [
  { id: 'R-101', date: '2026-05-05', depTime: '09:00 AM', arrTime: '09:12 AM', bike: 'BK-001', from: 'JFH Kubo', to: 'CBAA', duration: '12 min', cost: 5, status: 'Completed' },
  { id: 'R-100', date: '2026-05-04', depTime: '04:30 PM', arrTime: '04:44 PM', bike: 'BK-003', from: 'CBAA', to: 'JFH Kubo', duration: '14 min', cost: 5, status: 'Completed' },
  { id: 'R-099', date: '2026-05-02', depTime: '10:15 AM', arrTime: '10:33 AM', bike: 'BK-002', from: 'JFH Kubo', to: 'CBAA', duration: '18 min', cost: 10, status: 'Penalty Applied' },
  { id: 'R-098', date: '2026-04-28', depTime: '01:00 PM', arrTime: '01:10 PM', bike: 'BK-001', from: 'CBAA', to: 'JFH Kubo', duration: '10 min', cost: 5, status: 'Completed' },
  { id: 'R-097', date: '2026-04-25', depTime: '08:45 AM', arrTime: '08:58 AM', bike: 'BK-004', from: 'JFH Kubo', to: 'CBAA', duration: '13 min', cost: 5, status: 'Completed' },
];

export function RideHistory() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Ride History</h1>
          <p className="text-sm text-gray-400 mt-0.5">View your past rides and charges.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select className="w-full sm:w-36 text-sm">
            <option>All Stations</option>
            <option>JFH Kubo</option>
            <option>CBAA</option>
          </Select>
          <Select className="w-full sm:w-36 text-sm">
            <option>Last 30 Days</option>
            <option>This Week</option>
            <option>All Time</option>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3.5 font-semibold whitespace-nowrap">Date & Time</th>
                  <th className="px-5 py-3.5 font-semibold whitespace-nowrap">Route</th>
                  <th className="px-5 py-3.5 font-semibold whitespace-nowrap">Bike</th>
                  <th className="px-5 py-3.5 font-semibold text-right whitespace-nowrap">Duration</th>
                  <th className="px-5 py-3.5 font-semibold text-right whitespace-nowrap">Cost</th>
                  <th className="px-5 py-3.5 font-semibold text-center whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockHistory.map((ride) => (
                  <tr key={ride.id} className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{ride.date}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{ride.depTime} – {ride.arrTime}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{ride.from} → {ride.to}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-lg bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
                        {ride.bike}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right text-gray-700">{ride.duration}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <span className="font-bold text-gray-900">₱{ride.cost.toFixed(2)}</span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-center">
                      <Badge variant={ride.status === 'Completed' ? 'success' : 'warning'}>
                        {ride.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span className="text-xs">Showing 1–5 of 12 entries</span>
            <div className="flex gap-1">
              <button className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition-colors" disabled>Prev</button>
              <button className="px-2.5 py-1 text-xs border border-green-600 bg-green-700 text-white rounded-lg font-semibold">1</button>
              <button className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">2</button>
              <button className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">3</button>
              <button className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Next</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
