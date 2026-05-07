import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { Bike, Clock, Wallet, Leaf, AlertTriangle, Bell, LogOut, Menu, X } from 'lucide-react';
import { useAppContext } from '../../context';
import { DePedalWordmark } from '../shared/assets';

const navItems = [
  { to: '/app', icon: Bike, label: 'Dashboard', exact: true },
  { to: '/app/rides', icon: Clock, label: 'Rides' },
  { to: '/app/wallet', icon: Wallet, label: 'Wallet' },
  { to: '/app/carbon', icon: Leaf, label: 'Carbon' },
  { to: '/app/report', icon: AlertTriangle, label: 'Report' },
  { to: '/app/notifications', icon: Bell, label: 'Alerts' },
];

export function UserLayout() {
  const { currentUser, setCurrentUser } = useAppContext();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 bg-white flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4 h-16">
          <DePedalWordmark />
        </div>

        {/* User info */}
        <div className="border-b border-gray-100 px-5 py-4">
          <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.name}</p>
          <p className="text-xs text-gray-500 truncate">{currentUser.id}</p>
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-green-50 border border-green-200 px-3 py-1.5 text-sm font-semibold text-green-800">
            <Wallet className="w-3.5 h-3.5" />
            ₱{currentUser.balance.toFixed(2)}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-green-50 text-green-700 border border-green-200 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="h-4.5 w-4.5 flex-shrink-0" style={{ width: '1.125rem', height: '1.125rem' }} />
              {item.label === 'Rides' ? 'Ride History' :
               item.label === 'Report' ? 'Report Damage' :
               item.label === 'Alerts' ? 'Notifications' : item.label}
            </NavLink>
          ))}
        </nav>

        {/* Sign out */}
        <div className="border-t border-gray-200 px-3 py-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile: slide-in drawer overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" />
        </div>
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 h-16">
          <DePedalWordmark />
          <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="border-b border-gray-100 px-5 py-4">
          <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
          <p className="text-xs text-gray-500">{currentUser.id}</p>
          <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-green-50 border border-green-200 px-3 py-1.5 text-sm font-semibold text-green-800">
            <Wallet className="w-3.5 h-3.5" />
            ₱{currentUser.balance.toFixed(2)}
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                  isActive ? 'bg-green-50 text-green-700 border border-green-200' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label === 'Rides' ? 'Ride History' :
               item.label === 'Report' ? 'Report Damage' :
               item.label === 'Alerts' ? 'Notifications' : item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-gray-200 px-3 py-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile top header */}
        <header className="flex md:hidden items-center justify-between bg-white border-b border-gray-200 px-4 h-14 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <DePedalWordmark />
          <div className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-lg px-2 py-1">
            ₱{currentUser.balance.toFixed(2)}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-24 md:pb-8">
            <Outlet />
          </div>
        </main>

        {/* ── Mobile bottom tab bar ── */}
        <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors duration-150 ${
                  isActive ? 'text-green-700' : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`rounded-lg p-1.5 transition-colors ${isActive ? 'bg-green-100' : ''}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
