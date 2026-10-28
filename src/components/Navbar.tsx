import React from 'react';
import { ViewMode, User } from '../types';
import { 
  Bell, Smartphone, Monitor, Sparkles, LogIn, 
  HelpCircle, BookOpen, Users, Calendar, LayoutDashboard,
  FileText, ShieldCheck, Lock
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  user: User | null;
  onOpenLogin: () => void;
  onOpenNotifications: () => void;
  onOpenProblemSolution: () => void;
  isAdminAuthenticated: boolean;
  isMobileDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  user,
  onOpenLogin,
  onOpenNotifications,
  onOpenProblemSolution,
  isAdminAuthenticated,
  isMobileDeviceFrame,
  onToggleDeviceFrame,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#101E42] to-[#3563F5] text-white font-black text-base flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              A
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-[#101E42] block leading-none">
                A Class
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight hidden sm:block">
                Academic & Agile Workspace
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
              currentView === 'dashboard'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onNavigate('class-space')}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
              currentView === 'class-space'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Class Space</span>
          </button>

          <button
            onClick={() => onNavigate('materials-hub')}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
              currentView === 'materials-hub'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pusat Materi</span>
          </button>

          <button
            onClick={() => onNavigate('group-workspace')}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
              currentView === 'group-workspace'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Group Workspace</span>
          </button>

          <button
            onClick={() => onNavigate('personal-dashboard')}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
              currentView === 'personal-dashboard'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Personal</span>
          </button>

          <button
            onClick={() => onNavigate('admin-panel')}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'admin-panel'
                ? 'bg-indigo-50 text-indigo-700 font-bold ring-1 ring-indigo-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title={isAdminAuthenticated ? 'Panel Admin Terbuka' : 'Portal Khusus Admin / Dosen (Login Terpisah)'}
          >
            {isAdminAuthenticated ? (
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span>{isAdminAuthenticated ? 'Admin CRUD' : 'Portal Admin'}</span>
          </button>
        </nav>

        {/* Zone 3: Actions, Device Toggle & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Problem & Solution Guide Button */}
          <button
            onClick={onOpenProblemSolution}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
            title="Lihat 6 Solusi Masalah Agile"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>6 Solusi Agile</span>
          </button>

          {/* Device Mockup Toggle (Mobile Frame vs Full Width) */}
          <button
            onClick={onToggleDeviceFrame}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              isMobileDeviceFrame
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Ganti tampilan bingkai simulasi smartphone mobile"
          >
            {isMobileDeviceFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-blue-300" />
                <span className="hidden sm:inline">Layar Penuh</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Simulasi Mobile</span>
              </>
            )}
          </button>

          {/* Structured Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </button>

          {/* User Profile or Login */}
          {user ? (
            <div 
              onClick={onOpenLogin}
              className="flex items-center gap-2 pl-1 cursor-pointer group"
              title="Ganti akun / Profil"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all">
                {user.name.charAt(0)}
              </div>
              <div className="hidden xl:block text-left text-xs leading-tight">
                <p className="font-bold text-slate-800 truncate max-w-[110px]">{user.name}</p>
                <p className="text-[10px] text-slate-400">{user.role}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 bg-blue-600 text-white font-semibold text-xs rounded-xl shadow-xs hover:bg-blue-700 transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Masuk</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
