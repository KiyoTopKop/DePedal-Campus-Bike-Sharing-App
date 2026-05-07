import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '../ui';
import { useAppContext } from '../../context';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function Dashboard() {
  const { currentUser, bikes, settings } = useAppContext();
  if (!currentUser) return null;

  const activeRide = bikes.find((b) => b.rider === currentUser.id);
  const jfhBikes = bikes.filter((b) => b.station === 'JFH Kubo' && b.status === 'Docked').length;
  const cbaaBikes = bikes.filter((b) => b.station === 'CBAA' && b.status === 'Docked').length;
  const hasRideBalance = currentUser.balance >= settings.minBalance;

  return (
    <div className="space-y-5">
      {/* ── Page header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-1">{getGreeting()}</p>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {currentUser.type} · {currentUser.department} · {currentUser.id}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link to="/app/report">
            <Button variant="outline" size="sm">Report Damage</Button>
          </Link>
          <Link to="/app/wallet">
            <Button size="sm">Top Up Wallet</Button>
          </Link>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {/* Balance card */}
        <div className="col-span-2 sm:col-span-1 lg:col-span-1 rounded-xl border-0 bg-gradient-to-br from-green-700 to-green-900 text-white shadow-md p-4 flex flex-col justify-between min-h-[120px]">
          <p className="text-xs font-medium text-green-200 uppercase tracking-widest">Balance</p>
          <div>
            <p className="text-3xl font-bold tracking-tight mt-2">₱{currentUser.balance.toFixed(2)}</p>
            <p className="text-xs text-green-300 mt-1.5">
              {hasRideBalance
                ? `Ready to ride`
                : `Need ₱${(settings.minBalance - currentUser.balance).toFixed(2)} more`}
            </p>
            <Link to="/app/wallet" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-green-100 hover:text-white transition-colors">
              Top Up <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Total Rides */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col justify-between min-h-[120px]">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Total Rides</p>
          <div>
            <p className="text-3xl font-bold text-gray-900 mt-2">{currentUser.totalRides}</p>
            <p className="text-xs text-gray-400 mt-1">All-time completed</p>
          </div>
        </div>

        {/* Carbon Saved */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col justify-between min-h-[120px]">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">CO₂ Saved</p>
          <div>
            <p className="text-3xl font-bold text-gray-900 mt-2">{currentUser.carbonSaved}</p>
            <p className="text-xs text-gray-400 mt-1">kg CO₂e total</p>
          </div>
        </div>

        {/* Ride Status */}
        <div className={`rounded-xl border p-4 flex flex-col justify-between min-h-[120px] ${activeRide ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'}`}>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Ride Status</p>
          <div>
            {activeRide ? (
              <>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <Badge variant="success">Active</Badge>
                </div>
                <p className="text-sm font-semibold text-gray-900 mt-1">Bike {activeRide.id}</p>
                <p className="text-xs text-gray-500">Started 5 mins ago</p>
              </>
            ) : (
              <>
                <Badge variant="neutral" className="mt-2">No Active Ride</Badge>
                <p className="text-xs text-gray-400 mt-1.5">Scan at any station</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Available Bikes */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-900">Available Bikes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'JFH Kubo', sub: 'Main Gate Area', count: jfhBikes, total: 2 },
                { name: 'CBAA Grounds', sub: 'Near Oval', count: cbaaBikes, total: 2 },
              ].map((station) => (
                <div key={station.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{station.name}</p>
                      <p className="text-xs text-gray-400">{station.sub}</p>
                    </div>
                    <span className="text-lg font-bold text-green-700">{station.count}<span className="text-xs text-gray-400 font-normal">/{station.total}</span></span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: station.total }).map((_, slot) => (
                      <div
                        key={slot}
                        className={`h-1.5 flex-1 rounded-full ${slot < station.count ? 'bg-green-500' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Rides */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-gray-900">Recent Rides</CardTitle>
              <Link to="/app/rides" className="text-xs font-medium text-green-700 hover:text-green-800 flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-100">
              {[
                { date: 'Today, 9:00 AM', route: 'JFH Kubo → CBAA', duration: '12 min', cost: 5, penalty: false },
                { date: 'Yesterday, 4:30 PM', route: 'CBAA → JFH Kubo', duration: '14 min', cost: 5, penalty: false },
                { date: 'Mon, 10:15 AM', route: 'JFH Kubo → CBAA', duration: '18 min', cost: 10, penalty: true },
              ].map((ride, i) => (
                <div key={i} className="flex items-center justify-between py-2.5">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{ride.route}</p>
                    <p className="text-xs text-gray-400">{ride.date} · {ride.duration}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-sm font-bold text-gray-900">₱{ride.cost.toFixed(2)}</p>
                    {ride.penalty && <span className="text-[10px] font-medium text-red-500">+penalty</span>}
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
