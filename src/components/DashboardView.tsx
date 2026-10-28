import React, { useState } from 'react';
import { Course, GroupProject, Task, Announcement, ViewMode } from '../types';
import { 
  BookOpen, CheckCircle, Users, Clock, Search, ChevronRight, 
  Calendar, Pin, AlertCircle, ArrowUpRight, Sparkles, Filter, 
  Plus, CheckSquare, Layers, FileText
} from 'lucide-react';

interface DashboardViewProps {
  userName: string;
  courses: Course[];
  groups: GroupProject[];
  tasks: Task[];
  announcements: Announcement[];
  onSelectTask: (task: Task) => void;
  onNavigate: (view: ViewMode) => void;
  onOpenNewTask: () => void;
  onOpenProblemSolution: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userName,
  courses,
  groups,
  tasks,
  announcements,
  onSelectTask,
  onNavigate,
  onOpenNewTask,
  onOpenProblemSolution,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'urgent'>('all');

  const activeTasks = tasks.filter((t) => t.status !== 'done');
  const urgentTasks = tasks.filter((t) => t.priority === 'Urgent' || t.daysLeftText.includes('2 hari') || t.daysLeftText.includes('3 hari'));
  const doneTasks = tasks.filter((t) => t.status === 'done');

  // Filter tasks based on query and filter mode
  const displayedTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterMode === 'urgent') {
      return matchesSearch && (t.priority === 'Urgent' || t.status === 'inprogress');
    }
    return matchesSearch;
  });

  const displayedAnnouncements = announcements.filter((a) => {
    return a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           a.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           a.content.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Welcome Banner & Agile Problem-Solution CTA */}
      <div className="bg-gradient-to-r from-[#101E42] via-[#1E3A8A] to-[#3563F5] rounded-2xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-medium mb-3 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>A Class · One Platform, All Your Academic Needs</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            Halo, {userName.split(' ')[0]}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-xl">
            Semangat terus untuk perkuliahan hari ini! Seluruh informasi kelas, tugas kelompok agile, dan deadline pribadi kamu sudah terintegrasi rapi di sini.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            <button
              onClick={() => onNavigate('materials-hub')}
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Buka Pusat Materi</span>
            </button>
            <button
              onClick={onOpenProblemSolution}
              className="px-3.5 py-2 bg-white text-blue-900 font-semibold text-xs rounded-xl shadow-xs hover:bg-blue-50 transition-all flex items-center gap-1.5"
            >
              <span>6 Solusi Masalah Agile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenNewTask}
              className="px-3.5 py-2 bg-blue-600/60 hover:bg-blue-600 border border-blue-400/40 text-white font-medium text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Buat Tugas</span>
            </button>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 rounded-full bg-blue-400/10 blur-2xl pointer-events-none" />
      </div>

      {/* 4 Quick Stat Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Stat 1: Mata Kuliah */}
        <button
          onClick={() => onNavigate('class-space')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
              {courses.length}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs font-semibold text-slate-700">Mata Kuliah</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Semester 5 Aktif</p>
        </button>

        {/* Stat 2: Tugas Aktif */}
        <button
          onClick={() => {
            setFilterMode('all');
            onNavigate('personal-dashboard');
          }}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
              {activeTasks.length}
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs font-semibold text-slate-700">Tugas Aktif</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{doneTasks.length} tugas telah selesai</p>
        </button>

        {/* Stat 3: Kelompok */}
        <button
          onClick={() => onNavigate('group-workspace')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
              {groups.length}
            </span>
            <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs font-semibold text-slate-700">Kelompok</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Workspace Agile Scrum</p>
        </button>

        {/* Stat 4: Deadline Dekat */}
        <button
          onClick={() => setFilterMode('urgent')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all text-left group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">
              {urgentTasks.length}
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs font-semibold text-slate-700">Deadline Dekat</p>
          <p className="text-[11px] text-amber-600 font-medium mt-0.5">Perlu perhatian prioritas</p>
        </button>
      </div>

      {/* Global Quick Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari mata kuliah, tugas, atau pengumuman akademik..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Main 2-Column Split: Tugas Mendatang & Pengumuman Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tugas Mendatang (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Tugas Mendatang</h2>
              <p className="text-xs text-slate-500">Prioritas tugas kuliah & sprint kelompok</p>
            </div>
            <button
              onClick={() => onNavigate('personal-dashboard')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {displayedTasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                onClick={() => onSelectTask(task)}
                className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    task.status === 'done'
                      ? 'bg-emerald-50 text-emerald-600'
                      : task.status === 'inprogress'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[11px] font-semibold text-blue-600 truncate">
                        {task.courseName}
                      </span>
                      {task.groupName && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span className="text-[11px] text-slate-500 truncate">{task.groupName}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span>PJ: <strong className="text-slate-700 font-medium">{task.assigneeName}</strong></span>
                      <span>·</span>
                      <span>{task.checklist.filter(c => c.completed).length}/{task.checklist.length} Checklist</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                    task.daysLeftText.includes('2 hari') || task.priority === 'Urgent'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : task.daysLeftText.includes('3 hari')
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {task.daysLeftText}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {task.progressPercent}% selesai
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pengumuman Terbaru (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Pengumuman Terbaru</h2>
              <p className="text-xs text-slate-500">Informasi resmi tidak tertimbun chat</p>
            </div>
            <button
              onClick={() => onNavigate('class-space')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              <span>Lihat Semua</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {displayedAnnouncements.slice(0, 4).map((ann) => (
              <div
                key={ann.id}
                onClick={() => onNavigate('class-space')}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {ann.isPinned && (
                      <Pin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {ann.title}
                    </span>
                  </div>
                  {ann.isNew && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-600 text-white shrink-0">
                      Baru
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2">
                  {ann.content}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-slate-100">
                  <span className="text-blue-600 font-medium">{ann.courseName}</span>
                  <span>{ann.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Info Box: WhatsApp Clutter Relief */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-blue-950">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Bebas Tertimbun di WhatsApp
            </p>
            <p className="text-blue-800 leading-relaxed text-[11px]">
              Semua materi slide kuliah dan pengumuman dosen tersimpan permanen di <b>Class Space</b>. Anda tidak perlu lagi scrolling ratusan chat grup untuk mencari link drive!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
