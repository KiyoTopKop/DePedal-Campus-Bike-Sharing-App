import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button, Card, CardContent } from '../ui';
import { useAppContext } from '../../context';
import { DePedalLogo } from '../shared/assets';
import { GCashQRCode } from '../shared/assets';
import { CheckCircle2, ChevronLeft } from 'lucide-react';

const steps = ['Account Info', 'Activate Account'];

export function Activate() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppContext();
  const [paid, setPaid] = useState(false);

  const handleComplete = () => {
    setPaid(true);
    setTimeout(() => {
      setCurrentUser({
        id: '2023-12345',
        name: 'Juan Dela Cruz',
        email: 'jdc1234@dlsud.edu.ph',
        type: 'Student',
        department: 'CICS',
        balance: 50,
        totalRides: 0,
        carbonSaved: 0,
        status: 'Active',
      });
      navigate('/app');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top nav */}
      <header className="bg-white border-b border-gray-200 h-14 flex items-center px-6">
        <Link to="/register" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="mx-auto flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-green-700 flex items-center justify-center text-white">
            <DePedalLogo className="w-4 h-4" />
          </div>
          <span className="font-bold text-gray-900">DePedal</span>
        </div>
        <div className="w-16" /> {/* spacer to center logo */}
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10 w-full max-w-xs">
          {steps.map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i === 0 ? 'bg-green-700 text-white' :
                  i === 1 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i === 0 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm font-medium ${i <= 1 ? 'text-gray-900' : 'text-gray-400'}`}>{step}</span>
              </div>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-green-300" />}
            </React.Fragment>
          ))}
        </div>

        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Activate Your Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Scan the QR code below in your <strong>GCash app</strong> to complete your initial top-up of ₱50.
              This activates your account and gives you <strong>10 rides</strong>.
            </p>
          </div>

          {paid ? (
            /* ── Success state ── */
            <Card className="shadow-sm border-green-200 bg-green-50">
              <CardContent className="pt-8 pb-8 flex flex-col items-center gap-2 text-center">
                <p className="text-sm font-bold text-green-800">Payment Confirmed</p>
                <p className="text-xs text-green-600">Account activated · ₱50 balance · 10 rides</p>
                <p className="text-xs text-green-500 mt-2">Redirecting to your dashboard...</p>
              </CardContent>
            </Card>
          ) : (
            /* ── QR payment ── */
            <Card className="shadow-lg border-gray-200">
              <CardContent className="pt-6">
                <GCashQRCode amount={50} />

                <div className="mt-6 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Important</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>Minimum initial top-up is exactly <strong>₱50</strong></li>
                    <li>This is a system prototype — no real payment is charged</li>
                    <li>Your account will be activated immediately after payment</li>
                  </ul>
                </div>

                <Button
                  onClick={handleComplete}
                  className="w-full mt-5"
                  size="md"
                >
                  Simulate Payment Received
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
