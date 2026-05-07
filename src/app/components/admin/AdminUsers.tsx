import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Button, Input, Select, Badge } from '../ui';
import { Search, UserPlus } from 'lucide-react';

const mockUsers = [
  { id: '2023-12345', name: 'Juan Dela Cruz',  email: 'jdc1234@dlsud.edu.ph',  type: 'Student', department: 'CICS', balance: 150, status: 'Active' },
  { id: '2023-54321', name: 'Maria Santos',    email: 'ms1234@dlsud.edu.ph',   type: 'Student', department: 'CEAT', balance: 50,  status: 'Active' },
  { id: 'FAC-0012',   name: 'Dr. Jose Rizal',  email: 'jrizal@dlsud.edu.ph',   type: 'Faculty', department: 'CLA',  balance: 500, status: 'Active' },
  { id: '2022-98765', name: 'Pedro Penduko',   email: 'pp9876@dlsud.edu.ph',   type: 'Student', department: 'CBAA', balance: -15, status: 'Suspended' },
  { id: '2024-11111', name: 'Ana Reyes',        email: 'ar1111@dlsud.edu.ph',   type: 'Student', department: 'CSCS', balance: 0,   status: 'Blocked' },
];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

const avatarColors: Record<string, string> = {
  Active:    'bg-green-100 text-green-800',
  Suspended: 'bg-amber-100 text-amber-800',
  Blocked:   'bg-red-100 text-red-800',
};

export function AdminUsers() {
  const [searchTerm, setSearchTerm]         = useState('');
  const [filterType, setFilterType]         = useState('All');
  const [filterDepartment, setFilterDepartment] = useState('All');

  const departments = ['All', ...Array.from(new Set(mockUsers.map((u) => u.department)))];

  const filteredUsers = mockUsers.filter((u) => {
    const matchesSearch  = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.id.includes(searchTerm);
    const matchesType    = filterType === 'All' || u.type === filterType;
    const matchesDep     = filterDepartment === 'All' || u.department === filterDepartment;
    return matchesSearch && matchesType && matchesDep;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">User Management</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage student, faculty, and staff accounts.</p>
        </div>
        <Button size="sm" className="shrink-0 gap-2">
          <UserPlus className="h-3.5 w-3.5" />
          Add User
        </Button>
      </div>

      <Card>
        {/* Filter bar */}
        <CardHeader className="pb-0 px-4 pt-4">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                className="pl-8 h-9 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="h-9 text-sm sm:w-36"
              >
                <option value="All">All Types</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Staff">Staff</option>
              </Select>
              <Select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="h-9 text-sm sm:w-40"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
                ))}
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 mt-3">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-y border-border bg-muted/30 text-xs text-muted-foreground uppercase tracking-wide">
                  <th className="px-4 py-3 font-semibold">User</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">ID Number</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Balance</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-100"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatarColors[user.status]}`}>
                          {getInitials(user.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground text-sm leading-none">{user.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground whitespace-nowrap font-mono">
                      {user.id}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-muted-foreground whitespace-nowrap">
                      {user.type} &middot; {user.department}
                    </td>
                    <td className="px-4 py-3.5 text-sm whitespace-nowrap">
                      <span className={user.balance < 0 ? 'font-bold text-red-600' : 'font-semibold text-foreground'}>
                        ₱{user.balance.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <Badge
                        variant={
                          user.status === 'Active'
                            ? 'success'
                            : user.status === 'Suspended'
                              ? 'warning'
                              : 'danger'
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <Button variant="outline" size="sm" className="h-7 px-3 text-xs">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                      No users found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Count footer */}
          <div className="px-4 py-2.5 border-t border-border bg-muted/10 text-xs text-muted-foreground">
            {filteredUsers.length} of {mockUsers.length} users shown
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
