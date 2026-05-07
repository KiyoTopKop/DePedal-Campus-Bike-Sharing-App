import React from 'react';
import { useNavigate, Link } from 'react-router';
import { Button, Input, Label, Card, CardContent } from '../ui';
import { useAppContext } from '../../context';
import { DePedalLogo } from '../shared/assets';

export function AdminLogin() {
  const navigate = useNavigate();
  const { setIsAdmin } = useAppContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdmin(true);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-sidebar relative overflow-hidden px-6 py-12">
      {/* Subtle background texture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-[var(--sidebar-accent)] opacity-40 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[var(--sidebar-primary)] opacity-5 blur-3xl" />
      </div>

      <div className="relative max-w-sm w-full mx-auto space-y-8">
        {/* Brand mark */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--sidebar-primary)] shadow-lg mb-5">
              <DePedalLogo className="w-7 h-7 text-[var(--sidebar-primary-foreground)]" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-[var(--sidebar-foreground)] tracking-tight">
            DePedal Admin
          </h1>
          <p className="mt-1.5 text-sm text-[var(--sidebar-muted-foreground)]">
            Authorized personnel only
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-[var(--sidebar-border)] bg-[var(--sidebar-accent)] p-7 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="username"
                className="text-xs font-semibold uppercase tracking-wide text-[var(--sidebar-muted-foreground)]"
              >
                Admin Username
              </Label>
              <Input
                id="username"
                required
                placeholder="admin"
                className="bg-[var(--sidebar)] border-[var(--sidebar-border)] text-[var(--sidebar-foreground)] placeholder:text-[var(--sidebar-muted-foreground)] focus:border-[var(--sidebar-primary)] focus:ring-[var(--sidebar-primary)]/30 h-10"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wide text-[var(--sidebar-muted-foreground)]"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                className="bg-[var(--sidebar)] border-[var(--sidebar-border)] text-[var(--sidebar-foreground)] placeholder:text-[var(--sidebar-muted-foreground)] focus:border-[var(--sidebar-primary)] focus:ring-[var(--sidebar-primary)]/30 h-10"
              />
            </div>

            {/* Audit notice */}
            <div className="rounded-lg border border-[var(--sidebar-border)] bg-[var(--sidebar)]/60 px-3.5 py-3">
              <p className="text-xs text-[var(--sidebar-muted-foreground)] leading-relaxed">
                All admin actions are logged and audited. Unauthorized access is a violation of DePedal usage policy.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <Button
                type="submit"
                className="w-full bg-[var(--sidebar-primary)] text-[var(--sidebar-primary-foreground)] hover:opacity-90 shadow-md"
                size="md"
              >
                Access Dashboard
              </Button>
              <Link to="/" className="block">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-[var(--sidebar-border)] text-[var(--sidebar-muted-foreground)] hover:bg-[var(--sidebar)] hover:text-[var(--sidebar-foreground)]"
                  size="md"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
