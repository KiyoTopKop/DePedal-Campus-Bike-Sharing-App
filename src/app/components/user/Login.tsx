import React from 'react';
import { useNavigate, Link } from 'react-router';
import { Button, Input, Label, Card, CardContent } from '../ui';
import { useAppContext } from '../../context';
import { DePedalLogo, DePedalWordmark } from '../shared/assets';

export function Login() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      id: '2023-12345',
      name: 'Juan Dela Cruz',
      email: 'jdc1234@dlsud.edu.ph',
      type: 'Student',
      department: 'CICS',
      balance: 150,
      totalRides: 12,
      carbonSaved: 4.5,
      status: 'Active',
    });
    navigate('/app');
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel (desktop only) ── */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-gradient-to-br from-green-700 via-green-800 to-green-900 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-white/5" />
        </div>
        <div className="relative">
          <DePedalWordmark className="h-10" />
        </div>
        <div className="relative space-y-8">
          <div>
            <h1 className="text-3xl font-bold leading-tight mb-4">
              Sustainable campus mobility starts here.
            </h1>
            <p className="text-green-200 leading-relaxed">
              Scan your DLSU-D ID at JFH Kubo or CBAA grounds to unlock a bicycle. ₱5 per 15-minute session.
            </p>
          </div>
          <div className="space-y-3.5">
            {[
              'Barcode-authenticated bicycle access',
              'GCash cashless e-wallet top-up',
              'Automatic carbon savings tracking',
            ].map((text) => (
              <div key={text} className="flex items-center gap-3 text-sm text-green-100">
                <div className="h-1 w-1 rounded-full bg-green-400 flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-green-300">
          Exclusively for DLSU-D students, faculty, and staff.
        </p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex flex-col justify-center bg-gray-50 px-6 py-12 sm:px-10 lg:px-16">
        {/* Mobile logo */}
        <div className="lg:hidden flex justify-center mb-8">
          <Link to="/">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-green-700 flex items-center justify-center text-white shadow-sm">
                <DePedalLogo className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-gray-900">DePedal</span>
            </div>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Sign in</h2>
            <p className="mt-1.5 text-sm text-gray-500">
              New to DePedal?{' '}
              <Link to="/register" className="font-semibold text-green-700 hover:text-green-600 transition-colors">
                Create an account
              </Link>
            </p>
          </div>

          <Card className="shadow-sm border-gray-200">
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="studentId">Student / Staff ID Number</Label>
                  <Input id="studentId" required placeholder="e.g. 2023-12345" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs font-medium text-green-700 hover:text-green-600 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <Input id="password" type="password" required placeholder="••••••••" />
                </div>

                <div className="flex items-center gap-2 pt-0.5">
                  <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-green-600" />
                  <label htmlFor="remember-me" className="text-sm text-gray-600">Keep me signed in</label>
                </div>

                <div className="space-y-2.5 pt-1">
                  <Button type="submit" className="w-full" size="md">Sign In</Button>
                  <Link to="/" className="block">
                    <Button type="button" variant="outline" className="w-full">Back to Home</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
