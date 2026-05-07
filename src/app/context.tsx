import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  type: string;
  department: string;
  balance: number;
  totalRides: number;
  carbonSaved: number;
  status: 'Active' | 'Suspended' | 'Blocked';
};

type Bike = {
  id: string;
  status: 'Docked' | 'In-Use' | 'Unavailable';
  station: string;
  coordinates: [number, number];
  battery: number;
  rider?: string;
  slot?: number;
};

type Settings = {
  ridePrice: number;
  penaltyRate: number;
  minBalance: number;
};

type AppContextType = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  bikes: Bike[];
  setBikes: React.Dispatch<React.SetStateAction<Bike[]>>;
  settings: Settings;
  setSettings: (settings: Settings) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
};

const defaultSettings = {
  ridePrice: 5,
  penaltyRate: 5,
  minBalance: 5,
};

const mockUser: User = {
  id: '2023-12345',
  name: 'Juan Dela Cruz',
  email: 'jdc1234@dlsud.edu.ph',
  type: 'Student',
  department: 'CICS',
  balance: 150,
  totalRides: 12,
  carbonSaved: 4.5,
  status: 'Active',
};

const mockBikes: Bike[] = [
  { id: 'BK-001', status: 'Docked', station: 'JFH Kubo', coordinates: [14.321384152364715, 120.9630291049015], battery: 95, slot: 1 },
  { id: 'BK-002', status: 'Docked', station: 'JFH Kubo', coordinates: [14.32145, 120.96312], battery: 80, slot: 2 },
  { id: 'BK-003', status: 'In-Use', station: 'CBAA', coordinates: [14.322614355095514, 120.96331013554922], battery: 60, rider: '2023-12345' },
  { id: 'BK-004', status: 'Unavailable', station: 'CBAA', coordinates: [14.323954845683534, 120.95844338120529], battery: 10, slot: 2 },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUser);
  const [bikes, setBikes] = useState<Bike[]>(mockBikes);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, bikes, setBikes, settings, setSettings, isAdmin, setIsAdmin }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
