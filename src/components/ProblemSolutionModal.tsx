import React from 'react';
import { AGILE_PROBLEMS_SOLUTIONS } from '../data/initialData';
import { ViewMode } from '../types';
import { X, CheckCircle2, ArrowRight, ShieldAlert, Sparkles, FolderKanban, Search, Bell, Users, Calendar } from 'lucide-react';

interface ProblemSolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToView: (view: ViewMode) => void;
}

export const ProblemSolutionModal: React.FC<ProblemSolutionModalProps> = ({
  isOpen,
  onClose,
  onNavigateToView,
}) => {
  if (!isOpen) return null;

  const getIcon = (name: string) => {
    switch (name) {
      case 'FolderKanban': return <FolderKanban className="w-5 h-5 text-blue-600" />;
      case 'Search': return <Search className="w-5 h-5 text-indigo-600" />;
      case 'Bell': return <Bell className="w-5 h-5 text-amber-600" />;
      case 'Users': return <Users className="w-5 h-5 text-emerald-600" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-violet-600" />;
      default: return <Sparkles className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-900 to-indigo-950 text-white">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200">
                Agile Project Management
              </span>
              <span className="text-xs text-blue-200">· Matriks Solusi UX</span>
            </div>
            <h2 className="text-lg font-bold">
              6 Permasalahan Mahasiswa & Solusi A Class
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Aplikasi <b>A Class</b> dibangun secara khusus sebagai respons terpadu terhadap 6 tantangan kritis komunikasi dan koordinasi tugas perkuliahan mahasiswa:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {AGILE_PROBLEMS_SOLUTIONS.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                      {item.id}
                    </span>
                    <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                      {getIcon(item.iconName)}
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>

                  {/* Problem Box */}
                  <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-100 text-[11px] text-rose-900 mb-2">
                    <p className="font-semibold text-rose-800 flex items-center gap-1 mb-0.5">
                      <ShieldAlert className="w-3 h-3 text-rose-600" />
                      Masalah:
                    </p>
                    <p className="text-rose-900 leading-snug">{item.problem}</p>
                  </div>

                  {/* Solution Box */}
                  <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-[11px] text-blue-900">
                    <p className="font-semibold text-blue-800 flex items-center gap-1 mb-0.5">
                      <CheckCircle2 className="w-3 h-3 text-blue-600" />
                      Solusi A Class: {item.solution}
                    </p>
                    <p className="text-blue-950 leading-snug">{item.solutionDesc}</p>
                  </div>
                </div>

                {/* Direct Action Jump Button */}
                <button
                  onClick={() => {
                    onNavigateToView(item.targetView);
                    onClose();
                  }}
                  className="w-full mt-2 py-2 px-3 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors group"
                >
                  <span>Buka Fitur Ini di Aplikasi</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>A Class: Belajar · Berorganisasi · Berkembang</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
