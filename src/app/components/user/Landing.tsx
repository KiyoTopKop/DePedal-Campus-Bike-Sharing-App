import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '../ui';
import { DePedalLogo } from '../shared/assets';

/* ── Feature data — research-paper accurate ── */
const features = [
  {
    num: '01',
    title: 'Barcode Authentication',
    description: 'Scan your DLSU-D ID barcode at any docking station. The lock releases in under 10 seconds — no separate app required.',
  },
  {
    num: '02',
    title: 'GPS Tracking & Geofencing',
    description: 'Real-time bicycle location visible to administrators. An audible alarm triggers if a bike exits the DLSU-D campus boundary.',
  },
  {
    num: '03',
    title: 'GCash E-Wallet',
    description: 'Top up via GCash: ₱5 (1 ride), ₱25 (5 rides), ₱50 (10 rides). A minimum balance of ₱5 is required to start any ride.',
  },
  {
    num: '04',
    title: 'Carbon Savings Tracking',
    description: 'CO₂ savings are computed automatically per ride using the formula: Distance × 0.11 kg CO₂e/km (Harvie, 2021).',
  },
];

export function Landing() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-[Inter,system-ui,sans-serif]">

      {/* ── Sticky Navbar ── */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-green-700 text-white shadow-sm">
              <DePedalLogo className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">DePedal</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Link to="/register">
              <Button size="sm" className="gap-1.5">
                Get Started <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-green-50/30 to-white">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-100/50 blur-3xl" />
            <div className="absolute top-32 -left-16 w-72 h-72 rounded-full bg-emerald-50/60 blur-2xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 text-center">
            {/* SDG Badge */}
            <div
              className={`inline-flex items-center gap-2 rounded-full bg-green-100 border border-green-200 px-4 py-1.5 text-xs font-semibold text-green-800 mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Supporting SDGs 1, 3, 4, 11 &amp; 13
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight tracking-tight mb-6 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Smart Campus Mobility for{' '}
              <span className="text-green-700">DLSU-D</span>
            </h1>

            <p
              className={`text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              DePedal is a barcode-authenticated, GPS-tracked bicycle sharing system for De La Salle University – Dasmariñas. Ride between JFH Kubo and CBAA for only ₱5 per 15 minutes.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto gap-2 px-8 shadow-lg hover:shadow-xl">
                  Register Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 px-8">
                  Sign In
                </Button>
              </Link>
              <Link to="/admin/login" className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                Admin Access →
              </Link>
            </div>

            {/* Hero visual */}
            <div
              className={`mt-16 flex justify-center transition-all duration-700 delay-500 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-green-100 blur-2xl opacity-70 scale-150" />
                <div className="relative w-32 h-32 rounded-3xl bg-white border border-gray-200 shadow-xl flex items-center justify-center">
                  <div className="text-green-700">
                    <DePedalLogo className="w-20 h-20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { value: '₱5', label: 'Per 15-min session' },
                { value: '2', label: 'Docking stations' },
                { value: '<10s', label: 'Scan-to-unlock' },
                { value: '0.11 kg', label: 'CO₂e saved per km' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-green-700">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: '1',
                title: 'Register',
                desc: 'Sign up with your DLSU-D Student ID and Outlook email. An initial top-up of ₱50 activates your account with 10 rides.',
              },
              {
                step: '2',
                title: 'Scan & Ride',
                desc: 'Present your ID barcode at JFH Kubo or CBAA docking station. The electronic lock releases in under 10 seconds.',
              },
              {
                step: '3',
                title: 'Track Your Impact',
                desc: 'Return the bike to any station. Your carbon savings are logged automatically — Distance × 0.11 kg CO₂e/km.',
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-start gap-4">
                <span className="text-4xl font-bold text-green-100 leading-none select-none">{s.step.padStart(2, '0')}</span>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Key Features ── */}
        <section className="border-t border-gray-100 py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-2">System Capabilities</p>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Key Features</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-xl overflow-hidden">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-white p-6 hover:bg-green-50/40 transition-colors duration-200"
                >
                  <p className="text-xs font-bold text-green-700 mb-3 uppercase tracking-widest">{f.num}</p>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stations CTA ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-green-700 rounded-2xl p-10 sm:p-14 text-center text-white overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-green-600/40" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-green-800/40" />
            </div>
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Two Stations. One Campus.
              </h2>
              <p className="text-green-100 text-lg mb-3">
                Station A: <strong className="text-white">JFH Kubo</strong> &nbsp;|&nbsp; Station B: <strong className="text-white">CBAA Grounds</strong>
              </p>
              <p className="text-green-200 text-sm mb-8 max-w-xl mx-auto">
                Exclusively for DLSU-D students, faculty, and staff. Join the campus sustainability movement today.
              </p>
              <Link to="/register">
                {/* Explicit white text + green border so it's always visible */}
                <button className="inline-flex items-center gap-2 rounded-xl border-2 border-white bg-transparent text-white font-semibold px-8 py-3 text-sm hover:bg-white hover:text-green-700 transition-colors duration-200">
                  Create Your Account <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-green-700 flex items-center justify-center text-white">
              <DePedalLogo className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-gray-700">DePedal</span>
          </div>
          <p>© 2026 DePedal Smart Bicycle Sharing System — DLSU-D Campus Use Only</p>
          <p className="text-xs text-gray-400">Lentejas · Jimenez · Nicol · Adviser: Prof. Mayuga</p>
        </div>
      </footer>
    </div>
  );
}
