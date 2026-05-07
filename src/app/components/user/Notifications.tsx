import React from 'react';
import { Card, CardContent, Button } from '../ui';
import { AlertTriangle, Info, Ban, CheckCircle2, Bell } from 'lucide-react';

const typeConfig = {
  alert: { icon: AlertTriangle, bg: 'bg-red-50', border: 'border-l-red-500', dot: 'bg-red-500', iconColor: 'text-red-500' },
  info: { icon: Info, bg: 'bg-blue-50', border: 'border-l-blue-500', dot: 'bg-blue-500', iconColor: 'text-blue-500' },
  penalty: { icon: Ban, bg: 'bg-amber-50', border: 'border-l-amber-500', dot: 'bg-amber-500', iconColor: 'text-amber-500' },
  success: { icon: CheckCircle2, bg: 'bg-green-50', border: 'border-l-green-500', dot: 'bg-green-500', iconColor: 'text-green-600' },
};

type NotifType = keyof typeof typeConfig;

export function Notifications() {
  const notifs: { id: number; type: NotifType; title: string; message: string; time: string; read: boolean }[] = [
    { id: 1, type: 'alert', title: 'Low Balance Warning', message: 'Your balance is below ₱10. Please top up to continue using DePedal.', time: '2 hours ago', read: false },
    { id: 2, type: 'info', title: 'Maintenance Notice', message: 'CBAA docking station will undergo maintenance on May 6 from 8AM to 12PM.', time: 'Yesterday', read: true },
    { id: 3, type: 'penalty', title: 'Penalty Applied', message: 'A ₱5 penalty was applied to your account for exceeding the 15-minute ride limit on Bike BK-002.', time: 'May 2, 2026', read: true },
    { id: 4, type: 'success', title: 'Registration Successful', message: 'Welcome to DePedal! Your account is now active with ₱50 balance (10 rides).', time: 'Apr 25, 2026', read: true },
  ];

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Notifications</h1>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-0.5">Stay updated on your account and system notices.</p>
        </div>
        <Button variant="outline" size="sm">Mark all read</Button>
      </div>

      <Card className="divide-y divide-gray-100 overflow-hidden">
        <CardContent className="p-0">
          {notifs.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <Bell className="w-10 h-10 text-gray-200" />
              <p className="text-sm text-gray-400">No notifications yet.</p>
            </div>
          ) : (
            notifs.map((notif) => {
              const cfg = typeConfig[notif.type];
              return (
                <div
                  key={notif.id}
                  className={`flex gap-3 px-4 py-4 border-l-4 transition-colors ${cfg.border} ${notif.read ? 'bg-white' : cfg.bg}`}
                >
                  <div className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${cfg.dot} ${notif.read ? 'opacity-0' : ''}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-0.5">
                      <h4 className={`text-sm font-semibold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-[11px] text-gray-400 whitespace-nowrap flex-shrink-0">{notif.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{notif.message}</p>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
