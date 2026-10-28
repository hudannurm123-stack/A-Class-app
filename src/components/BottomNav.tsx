import React from 'react';
import { ViewMode } from '../types';
import { LayoutDashboard, BookOpen, Users, FileText, ShieldCheck, Lock } from 'lucide-react';

interface BottomNavProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenProblemSolution: () => void;
  isAdminAuthenticated?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  onNavigate,
  onOpenProblemSolution,
  isAdminAuthenticated = false,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 md:hidden">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] ${
            currentView === 'dashboard' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Home</span>
        </button>

        <button
          onClick={() => onNavigate('class-space')}
          className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] ${
            currentView === 'class-space' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Kelas</span>
        </button>

        <button
          onClick={() => onNavigate('materials-hub')}
          className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] ${
            currentView === 'materials-hub' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <FileText className="w-5 h-5 mb-0.5 text-emerald-600" />
          <span className="text-[10px] leading-tight">Materi</span>
        </button>

        <button
          onClick={() => onNavigate('group-workspace')}
          className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] ${
            currentView === 'group-workspace' ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Tugas</span>
        </button>

        <button
          onClick={() => onNavigate('admin-panel')}
          className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] ${
            currentView === 'admin-panel' ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {isAdminAuthenticated ? (
            <ShieldCheck className="w-5 h-5 mb-0.5 text-indigo-600" />
          ) : (
            <Lock className="w-5 h-5 mb-0.5 text-amber-600" />
          )}
          <span className="text-[10px] leading-tight">{isAdminAuthenticated ? 'Admin' : 'Admin 🔒'}</span>
        </button>
      </div>
    </nav>
  );
};
