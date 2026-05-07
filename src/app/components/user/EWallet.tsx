import React, { useState } from 'react';
import { Card, CardContent } from '../ui';
import { useAppContext } from '../../context';
import { GCashQRCode } from '../shared/assets';
import { Button } from '../ui';

export function EWallet() {
  const { currentUser, setCurrentUser, settings } = useAppContext();
  const [selectedPkg, setSelectedPkg] = useState<number | null>(null);
  const [paid, setPaid] = useState(false);

  if (!currentUser) return null;

  const packages = [
    { amount: 5, rides: 1, label: 'Basic' },
    { amount: 25, rides: 5, label: 'Standard', popular: true },
    { amount: 50, rides: 10, label: 'Value' },
  ];

  const handleTopUp = () => {
    if (!selectedPkg) return;
    setPaid(true);
    setTimeout(() => {
      setCurrentUser({ ...currentUser, balance: currentUser.balance + selectedPkg });
      setSelectedPkg(null);
      setPaid(false);
    }, 1500);
  };

  const transactions = [
    { type: 'Ride Deduction', date: 'Today, 9:12 AM', amount: -5 },
    { type: 'Ride Deduction', date: 'Yesterday, 4:44 PM', amount: -5 },
    { type: 'GCash Top-Up', date: 'May 1, 10:00 AM', amount: 25 },
    { type: 'GCash Top-Up', date: 'Apr 20, 8:00 AM', amount: 50 },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">E-Wallet</h1>
        <p className="text-sm text-gray-400 mt-0.5">Manage your ride credits and top up via GCash.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left col */}
        <div className="space-y-5 lg:col-span-1">
          {/* Balance card */}
          <div className="rounded-xl border-0 bg-gradient-to-br from-green-700 to-green-900 text-white shadow-md p-5 flex flex-col gap-3">
            <p className="text-xs font-medium text-green-200 uppercase tracking-widest">Current Balance</p>
            <p className="text-4xl font-bold tracking-tight">₱{currentUser.balance.toFixed(2)}</p>
            <p className="text-xs text-green-300">Min. to ride: <strong className="text-white">₱{settings.minBalance.toFixed(2)}</strong></p>
          </div>

          {/* Transactions */}
          <Card>
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 text-sm">Recent Transactions</h3>
            </div>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${tx.amount > 0 ? 'bg-green-500' : 'bg-red-400'}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{tx.type}</p>
                        <p className="text-xs text-gray-400">{tx.date}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold flex-shrink-0 ml-2 ${tx.amount > 0 ? 'text-green-700' : 'text-gray-900'}`}>
                      {tx.amount > 0 ? '+' : ''}₱{Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right col — top-up */}
        <Card className="lg:col-span-2">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Top-Up Packages</h3>
            <p className="text-xs text-gray-500 mt-0.5">Select a package and scan the QR code in your GCash app.</p>
          </div>
          <CardContent className="pt-5">
            {/* Package grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.amount}
                  onClick={() => setSelectedPkg(pkg.amount)}
                  className={`cursor-pointer relative rounded-xl border-2 p-4 text-center transition-all duration-200 ${
                    selectedPkg === pkg.amount
                      ? 'border-green-600 bg-green-50 shadow-sm'
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-green-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                  <p className="text-xs font-semibold text-gray-500 mb-0.5">{pkg.label}</p>
                  <h3 className="text-xl font-bold text-gray-900">₱{pkg.amount}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{pkg.rides} ride{pkg.rides > 1 ? 's' : ''}</p>
                </div>
              ))}
            </div>

            {/* QR code area */}
            {selectedPkg ? (
              paid ? (
                <div className="flex flex-col items-center gap-2 py-10 text-center">
                  <p className="text-sm font-semibold text-green-700">Top-up Successful</p>
                  <p className="text-xs text-gray-400">₱{selectedPkg} has been added to your wallet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <GCashQRCode amount={selectedPkg} />
                  <Button onClick={handleTopUp} className="w-full" size="md">
                    Simulate Payment Received
                  </Button>
                </div>
              )
            ) : (
              <div className="rounded-xl border-2 border-dashed border-gray-100 py-12 text-center">
                <p className="text-sm text-gray-400">Select a package to view the GCash QR code.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
