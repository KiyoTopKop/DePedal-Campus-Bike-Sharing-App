import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router';
import {
  LayoutDashboard, Map, List, Users, BarChart3,
  AlertTriangle, Settings, Unlock, LogOut, Menu, X,
} from 'lucide-react';
import { useAppContext } from '../../context';
import { DePedalLogo } from '../shared/assets';

const navItems = [
  { to: '/admin',          icon: LayoutDashboard, label: 'Dashboard',        exact: true },
  { to: '/admin/tracking', icon: Map,             label: 'GPS Tracking' },
  { to: '/admin/logs',     icon: List,            label: 'Transaction Logs' },
  { to: '/admin/users',    icon: Users,           label: 'User Management' },
  { to: '/admin/reports',  icon: BarChart3,       label: 'Report Generation' },
  { to: '/admin/damage',   icon: AlertTriangle,   label: 'Damage Reports' },
  { to: '/admin/settings', icon: Settings,        label: 'System Settings' },
  { to: '/admin/override', icon: Unlock,          label: 'Manual Override' },
];

const pageTitles: Record<string, string> = {
  '/admin':           'Dashboard',
  '/admin/tracking':  'GPS Tracking',
  '/admin/logs':      'Transaction Logs',
  '/admin/users':     'User Management',
  '/admin/reports':   'Report Generation',
  '/admin/damage':    'Damage Reports',
  '/admin/settings':  'System Settings',
  '/admin/override':  'Manual Override',
};

export function AdminLayout() {
  const { setIsAdmin } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    setIsAdmin(false);
    navigate('/');
  };

  const pageTitle = pageTitles[location.pathname] ?? 'Admin';

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-16 flex-shrink-0 border-b border-[var(--sidebar-border)]">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--sidebar-primary)] flex-shrink-0">
          <DePedalLogo className="w-5 h-5 text-[var(--sidebar-primary-foreground)]" />
        </div>
        <div>
          <span className="text-sm font-bold text-[var(--sidebar-foreground)] tracking-tight leading-none">DePedal</span>
          <span className="block text-[10px] text-[var(--sidebar-muted-foreground)] leading-none mt-1 uppercase tracking-widest">
            Admin Portal
          </span>
        </div>
      </div>

      {/* Nav section label */}
      <div className="px-5 pt-5 pb-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--sidebar-muted-foreground)]">
          Navigation
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[var(--sidebar-accent)] text-[var(--sidebar-foreground)]'
                  : 'text-[var(--sidebar-muted-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-foreground)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`h-4 w-4 flex-shrink-0 transition-colors duration-150 ${
                    isActive ? 'text-[var(--sidebar-primary)]' : 'text-[var(--sidebar-muted-foreground)] group-hover:text-[var(--sidebar-foreground)]'
                  }`}
                />
                <span className="flex-1 truncate">{item.label}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--sidebar-primary)] flex-shrink-0" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sign out */}
      <div className="border-t border-[var(--sidebar-border)] px-3 py-3 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--sidebar-muted-foreground)] transition-all duration-150 hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-foreground)] cursor-pointer"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 flex-col bg-sidebar flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile slide-in drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-sidebar transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-[var(--sidebar-muted-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-foreground)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Top header bar (desktop + mobile) */}
        <header className="flex items-center gap-4 bg-white border-b border-border px-4 lg:px-6 h-14 flex-shrink-0">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile brand */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <DePedalLogo className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-foreground text-sm">DePedal</span>
          </div>

          {/* Page title (desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Admin</span>
            <span className="text-xs text-muted-foreground">/</span>
            <span className="text-sm font-semibold text-foreground">{pageTitle}</span>
          </div>

          <div className="flex-1" />

          {/* Admin badge */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-muted-foreground">Admin</span>
            </div>
          </div>
        </header>

        {/* Scrollable main */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
