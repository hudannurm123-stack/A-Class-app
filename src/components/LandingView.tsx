import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Users, Calendar, FolderKanban, BookOpen } from 'lucide-react';
import { ViewMode } from '../types';

interface LandingViewProps {
  onStartApp: () => void;
  onOpenProblemSolution: () => void;
  onNavigateToView: (view: ViewMode) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartApp,
  onOpenProblemSolution,
  onNavigateToView,
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#101E42] via-[#1A367A] to-[#3563F5] rounded-3xl p-6 sm:p-10 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>A Class · One Platform, All Your Academic Needs</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Kelola Akademik dan Tugas Kelompok Lebih Mudah
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-xl">
            A Class membantu kamu mengatur informasi kelas, materi kuliah, tugas kelompok agile, dan aktivitas pribadi dalam satu platform terpadu yang dirancang sesuai kebutuhan mahasiswa.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartApp}
              className="px-6 py-3 bg-white text-blue-900 font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:bg-blue-50 active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>Mulai Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenProblemSolution}
              className="px-5 py-3 bg-blue-600/40 hover:bg-blue-600/60 border border-blue-300/30 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all"
            >
              Pelajari 6 Solusi Fitur
            </button>
          </div>
        </div>

        {/* 4 KPI Proof Metrics in Hero */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 pt-8 border-t border-white/15 relative z-10">
          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">6+</span>
            <p className="text-xs text-blue-200 mt-0.5">Mata Kuliah</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">12+</span>
            <p className="text-xs text-blue-200 mt-0.5">Tugas Aktif</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">3</span>
            <p className="text-xs text-blue-200 mt-0.5">Kelompok Agile</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">100%</span>
            <p className="text-xs text-blue-200 mt-0.5">Lebih Terorganisir</p>
          </div>
        </div>

        {/* Background glow decoration */}
        <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
      </div>

      {/* Feature Pillars Section */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Fitur Utama Dirancang Untuk Alur Kerja Mahasiswa
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Menjawab tuntas permasalahan informasi tercecer di WhatsApp dan koordinasi tugas kelompok yang berantakan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1 */}
          <div 
            onClick={() => onNavigateToView('class-space')}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FolderKanban className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Class Space
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Informasi kelas, materi per pertemuan, jadwal, dan pengumuman resmi dosen yang terorganisir rapi tanpa pernah tertimbun percakapan grup chat.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:underline pt-2">
              Jelajahi Class Space &rarr;
            </span>
          </div>

          {/* Pillar 2 */}
          <div 
            onClick={() => onNavigateToView('group-workspace')}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Group Workspace
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Manajemen tugas kelompok agile dengan papan Kanban visual (To Do, In Progress, Done), checklist sub-tugas, pembagian penanggung jawab jelas, dan progress realtime.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 group-hover:underline pt-2">
              Buka Group Workspace &rarr;
            </span>
          </div>

          {/* Pillar 3 */}
          <div 
            onClick={() => onNavigateToView('personal-dashboard')}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Personal Dashboard
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gambaran menyeluruh seluruh tugas kuliah dan tenggat waktu dalam satu kalender terpadu, ringkasan prioritas, dan pelacak komitmen pribadi.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:underline pt-2">
              Pantau Personal Dashboard &rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
