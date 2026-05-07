import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button, Input, Label, Select, Card, CardContent } from '../ui';
import { DePedalLogo, DePedalWordmark } from '../shared/assets';
import { Check } from 'lucide-react';

const steps = ['Account Info', 'Activate Account'];

export function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('Student');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/activate');
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel (desktop only) ── */}
      <div className="hidden lg:flex w-5/12 flex-col justify-between bg-gradient-to-br from-green-700 via-green-800 to-green-900 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-white/5" />
        </div>
        <div className="relative">
          <DePedalWordmark className="h-10" />
        </div>
        <div className="relative space-y-6">
          <h1 className="text-3xl font-bold leading-tight">
            Join DePedal — DLSU-D's smart bicycle sharing system.
          </h1>
          <div className="bg-white/10 rounded-2xl p-5 border border-white/20">
            <p className="text-sm font-semibold text-white mb-3">Registration Requirements</p>
            <ul className="space-y-2">
              {[
                'Valid DLSU-D Student / Faculty / Staff ID',
                'Active DLSU-D Outlook email address',
                'Initial GCash top-up of ₱50 to activate',
              ].map((req) => (
                <li key={req} className="flex items-start gap-2.5 text-sm text-green-100">
                  <Check className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/10 rounded-2xl p-5 border border-white/20">
            <p className="text-sm font-semibold text-white mb-3">Top-up Packages</p>
            <div className="space-y-2">
              {[
                { pkg: '₱5', rides: '1 ride', highlight: false },
                { pkg: '₱25', rides: '5 rides', highlight: true },
                { pkg: '₱50', rides: '10 rides (Required for activation)', highlight: false },
              ].map((p) => (
                <div key={p.pkg} className={`flex justify-between text-sm rounded-lg px-3 py-2 ${p.highlight ? 'bg-white/20 font-semibold' : ''}`}>
                  <span className="text-white">{p.pkg}</span>
                  <span className="text-green-200">{p.rides}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="relative text-xs text-green-300">DLSU-D personnel only · DLSU-D, Dasmariñas, Cavite</p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex flex-col justify-center bg-gray-50 px-6 py-12 sm:px-10 lg:px-16 overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden flex justify-center mb-8">
          <Link to="/">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-green-700 flex items-center justify-center text-white shadow-md">
                <DePedalLogo className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">DePedal</span>
            </div>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            {steps.map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    i === 0 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-sm font-medium ${i === 0 ? 'text-gray-900' : 'text-gray-400'}`}>{step}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px bg-gray-200" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Create your account</h2>
            <p className="mt-1.5 text-sm text-gray-600">
              Already registered?{' '}
              <Link to="/login" className="font-semibold text-green-700 hover:text-green-600 transition-colors">Sign in</Link>
            </p>
          </div>

          <Card className="shadow-lg border-gray-200">
            <CardContent className="pt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" required placeholder="e.g. Juan Dela Cruz" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="studentId">ID Number</Label>
                  <Input id="studentId" required placeholder="e.g. 2023-12345" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="userType">User Type</Label>
                  <Select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Staff">Staff</option>
                  </Select>
                </div>

                {userType !== 'Staff' && (
                  <div className="space-y-1.5">
                    <Label htmlFor="department">Department / College</Label>
                    <Select id="department" required>
                      <option value="">Select College</option>
                      {['CLAC','CICS','CBAA','CTHM','CEAT','COED','CCJE','COS'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Select>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="email">DLSU-D Outlook Email</Label>
                  <Input id="email" type="email" required placeholder="initials+digits@dlsud.edu.ph" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required placeholder="Create a secure password" />
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <input id="terms" required type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-green-600 flex-shrink-0" />
                  <div>
                    <label htmlFor="terms" className="text-sm font-semibold text-gray-800 cursor-pointer">
                      I agree to the Terms of Use
                    </label>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Includes rules on 15-minute sessions, penalty policy, geofence terms, and damage reporting obligations.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Button type="submit" className="w-full" size="md">Continue to Activation</Button>
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
