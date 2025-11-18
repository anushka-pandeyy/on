'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

interface UserData {
  id: number;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  onroleId?: string;
  isPremium?: boolean;
  createdAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');

        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/me`,
          {
            headers: {
              'x-access-token': token,
            },
          }
        );

        setUser(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('Failed to load user data');
        // If unauthorized, redirect to login
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          localStorage.removeItem('accessToken');
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const getInitial = () => {
    if (user?.firstName) return user.firstName[0].toUpperCase();
    if (user?.username) return user.username[0].toUpperCase();
    return 'U';
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F9FB]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#002F5F] border-t-[#F57C00]"></div>
          <p className="text-[#002F5F]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F9FB]">
        <Card className="w-96 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-center text-red-700">{error}</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 w-full rounded-lg bg-[#002F5F] py-2 text-white hover:bg-[#001a36]"
            >
              Back to Login
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F9FB]">
        <Card className="w-96">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">No user data available</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 w-full rounded-lg bg-[#002F5F] py-2 text-white hover:bg-[#001a36]"
            >
              Back to Login
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8F9FB]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col h-full">
          {/* Logo / Title */}
          <div className="border-b border-gray-200 px-6 py-6">
            <h1 className="text-2xl font-bold text-[#002F5F]">OnRole</h1>
            <p className="text-xs text-gray-500 mt-1">Dashboard</p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <SidebarItem
              label="Dashboard"
              icon="📊"
              active={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
            />
            <SidebarItem
              label="Profile"
              icon="👤"
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            />
            <SidebarItem
              label="Settings"
              icon="⚙️"
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            />
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 px-4 py-4">
            <p className="text-xs text-gray-500">v1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Header with Avatar */}
        <header className="border-b border-gray-200 bg-white px-8 py-4 flex items-center justify-between shadow-sm">
          <h2 className="text-2xl font-bold text-[#002F5F]">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'profile' && 'Profile'}
            {activeTab === 'settings' && 'Settings'}
          </h2>

          {/* User Avatar & Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 focus:outline-none">
                <div className="h-10 w-10 rounded-full bg-[#F57C00] flex items-center justify-center text-white font-bold cursor-pointer hover:bg-[#e67e00] transition">
                  {getInitial()}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5">
                <p className="text-sm font-semibold text-gray-900">
                  {user.firstName || user.username}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <Card className="bg-gradient-to-r from-[#002F5F] to-[#004a8f] text-white border-0">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold">Welcome back, {user.firstName || user.username}! 👋</h3>
                  <p className="text-blue-100 mt-2">You're logged in and ready to explore</p>
                </CardContent>
              </Card>

              {/* User Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* First Name */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      First Name
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#002F5F]">
                      {user.firstName || '—'}
                    </p>
                  </CardContent>
                </Card>

                {/* Last Name */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Last Name
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#002F5F]">
                      {user.lastName || '—'}
                    </p>
                  </CardContent>
                </Card>

                {/* Username */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Username
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#002F5F]">
                      @{user.username}
                    </p>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold text-[#002F5F] break-all">
                      {user.email}
                    </p>
                  </CardContent>
                </Card>

                {/* OnRole ID */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      OnRole ID
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#002F5F]">
                      {user.onroleId || '—'}
                    </p>
                  </CardContent>
                </Card>

                {/* Membership Status */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Membership
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          user.isPremium
                            ? 'bg-[#F57C00]'
                            : 'bg-gray-300'
                        }`}
                      ></span>
                      <p className="text-lg font-semibold text-[#002F5F]">
                        {user.isPremium ? 'Premium' : 'Free'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Created At Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-700">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="text-lg font-semibold text-[#002F5F]">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : '—'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Profile management coming soon...</p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Settings page coming soon...</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

/**
 * Sidebar Item Component
 */
function SidebarItem({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition ${
        active
          ? 'bg-[#002F5F] text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
