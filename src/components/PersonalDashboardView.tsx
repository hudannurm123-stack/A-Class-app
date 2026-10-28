import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';
import { 
  Calendar as CalendarIcon, CheckSquare, Clock, Filter, 
  ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Plus 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PersonalDashboardViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onOpenNewTask: () => void;
  onUpdateTask: (task: Task) => void;
}

export const PersonalDashboardView: React.FC<PersonalDashboardViewProps> = ({
  tasks,
  onSelectTask,
  onOpenNewTask,
  onUpdateTask,
}) => {
  const [tab, setTab] = useState<'personal' | 'group' | 'history'>('personal');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);

  // Month navigation (Defaults to Oktober 2025 as in mockup, with 31 days)
  const [currentMonth, setCurrentMonth] = useState('Oktober 2025');

  // Stats calculation
  const totalTasks = tasks.length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;
  const inProgressCount = tasks.filter((t) => t.status === 'inprogress').length;
  const todoCount = tasks.filter((t) => t.status === 'todo').length;

  // Filter tasks based on current tab
  const tabFilteredTasks = tasks.filter((t) => {
    if (tab === 'personal') return t.isPersonal && t.status !== 'done';
    if (tab === 'group') return !t.isPersonal && t.status !== 'done';
    if (tab === 'history') return t.status === 'done';
    return true;
  });

  // Apply calendar date filter if any
  const displayedTasks = selectedDateFilter
    ? tabFilteredTasks.filter((t) => t.dueDate === selectedDateFilter)
    : tabFilteredTasks;

  const toggleTaskCompletion = (task: Task) => {
    const isNowDone = task.status !== 'done';
    const nextStatus: TaskStatus = isNowDone ? 'done' : 'inprogress';
    const nextProgress = isNowDone ? 100 : 50;

    if (isNowDone) {
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    }

    onUpdateTask({
      ...task,
      status: nextStatus,
      progressPercent: nextProgress,
    });
  };

  // Calendar dates mock generator for October 2025 (Starts on Wednesday)
  const calendarDays = [
    { day: null }, { day: null }, // Mon, Tue offset for Oct 1 (Wed)
    { day: 1, dateStr: '2025-10-01' },
    { day: 2, dateStr: '2025-10-02' },
    { day: 3, dateStr: '2025-10-03' },
    { day: 4, dateStr: '2025-10-04' },
    { day: 5, dateStr: '2025-10-05' },
    { day: 6, dateStr: '2025-10-06' },
    { day: 7, dateStr: '2025-10-07' },
    { day: 8, dateStr: '2025-10-08' },
    { day: 9, dateStr: '2025-10-09' },
    { day: 10, dateStr: '2025-10-10' },
    { day: 11, dateStr: '2025-10-11' },
    { day: 12, dateStr: '2025-10-12', hasDeadline: true },
    { day: 13, dateStr: '2025-10-13' },
    { day: 14, dateStr: '2025-10-14' },
    { day: 15, dateStr: '2025-10-15' },
    { day: 16, dateStr: '2025-10-16' },
    { day: 17, dateStr: '2025-10-17' },
    { day: 18, dateStr: '2025-10-18' },
    { day: 19, dateStr: '2025-10-19' },
    { day: 20, dateStr: '2025-10-20' },
    { day: 21, dateStr: '2025-10-21' },
    { day: 22, dateStr: '2025-10-22' },
    { day: 23, dateStr: '2025-10-23' },
    { day: 24, dateStr: '2025-10-24', hasDeadline: true },
    { day: 25, dateStr: '2025-10-25', hasDeadline: true },
    { day: 26, dateStr: '2025-10-26' },
    { day: 27, dateStr: '2025-10-27' },
    { day: 28, dateStr: '2025-10-28', hasDeadline: true, isSelected: true },
    { day: 29, dateStr: '2025-10-29', hasDeadline: true },
    { day: 30, dateStr: '2025-10-30', hasDeadline: true },
    { day: 31, dateStr: '2025-10-31', hasDeadline: true },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Personal Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Pantau semua aktivitas akademikmu, komitmen tugas pribadi, dan deadline terintegrasi.
          </p>
        </div>

        <button
          onClick={onOpenNewTask}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat Tugas Pribadi</span>
        </button>
      </div>

      {/* Main Grid: Left Tasks List (7 cols) & Right Metrics & Calendar (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tasks Feed with Tabs */}
        <div className="lg:col-span-7 space-y-4">
          {/* Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setTab('personal')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'personal' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tugas Pribadi
            </button>
            <button
              onClick={() => setTab('group')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'group' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tugas Kelompok
            </button>
            <button
              onClick={() => setTab('history')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'history' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Riwayat Selesai
            </button>
          </div>

          {/* Active Filter Pill if date selected */}
          {selectedDateFilter && (
            <div className="flex items-center justify-between p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
              <span className="font-medium">
                Menampilkan tugas tenggat tanggal: <strong>{selectedDateFilter}</strong>
              </span>
              <button
                onClick={() => setSelectedDateFilter(null)}
                className="text-blue-700 font-bold hover:underline"
              >
                Hapus Filter
              </button>
            </div>
          )}

          {/* Tasks List */}
          <div className="space-y-2.5">
            {displayedTasks.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                <p className="text-xs font-bold text-slate-800">Tidak ada tugas pada kategori ini</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Semua tugas telah diselesaikan atau belum ditambahkan.</p>
              </div>
            ) : (
              displayedTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Interactive Checkbox */}
                    <button
                      onClick={() => toggleTaskCompletion(task)}
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                        task.status === 'done'
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 hover:border-blue-500 bg-white'
                      }`}
                      title="Klik untuk menyelesaikan tugas"
                    >
                      {task.status === 'done' && <CheckSquare className="w-3.5 h-3.5" />}
                    </button>

                    <div className="min-w-0 cursor-pointer" onClick={() => onSelectTask(task)}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-semibold text-blue-600 truncate">
                          {task.courseName}
                        </span>
                        {task.groupName && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span className="text-[11px] text-slate-400 truncate">{task.groupName}</span>
                          </>
                        )}
                      </div>
                      <h4 className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                        task.status === 'done' 
                          ? 'line-through text-slate-400' 
                          : 'text-slate-900 group-hover:text-blue-600'
                      }`}>
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        PJ: {task.assigneeName} · {task.checklist.filter(c => c.completed).length}/{task.checklist.length} Checklist
                      </p>
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
                    <p className="text-[10px] text-slate-400 mt-1">{task.dueDate}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Ringkasan Progress & Kalender Akademik */}
        <div className="lg:col-span-5 space-y-4">
          {/* Ringkasan Completion Donut & Stats */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Ringkasan Tugas Akademik</h3>

            <div className="flex items-center gap-5">
              {/* Circular Radial Donut */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background track */}
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Completed stroke */}
                  <path
                    className="text-emerald-500 transition-all duration-500"
                    strokeDasharray={`${totalTasks > 0 ? (doneCount / totalTasks) * 100 : 0}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-xs font-black text-slate-900">{doneCount}/{totalTasks}</span>
                  <span className="block text-[9px] text-slate-400">Selesai</span>
                </div>
              </div>

              {/* Status Breakdown Legend */}
              <div className="space-y-2 flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-slate-600">Selesai (Done)</span>
                  </div>
                  <strong className="text-slate-900">{doneCount}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-slate-600">Dalam Proses</span>
                  </div>
                  <strong className="text-slate-900">{inProgressCount}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="text-slate-600">Belum Dimulai</span>
                  </div>
                  <strong className="text-slate-900">{todoCount}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Kalender Akademik Interaktif */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900">Kalender Akademik</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="font-semibold">{currentMonth}</span>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 pb-1 border-b border-slate-100">
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
              <span>Min</span>
            </div>

            {/* Month Day Cells */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {calendarDays.map((item, idx) => {
                if (!item.day) {
                  return <div key={idx} className="h-8" />;
                }

                const isDateSelected = selectedDateFilter === item.dateStr;
                const hasTaskDeadline = tasks.some((t) => t.dueDate === item.dateStr);

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (selectedDateFilter === item.dateStr) {
                        setSelectedDateFilter(null);
                      } else {
                        setSelectedDateFilter(item.dateStr || null);
                      }
                    }}
                    className={`h-8 rounded-lg flex flex-col items-center justify-center relative font-medium transition-all ${
                      isDateSelected
                        ? 'bg-blue-600 text-white font-bold shadow-xs scale-105'
                        : item.day === 28
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{item.day}</span>
                    {hasTaskDeadline && (
                      <span className={`w-1 h-1 rounded-full absolute bottom-1 ${
                        isDateSelected ? 'bg-white' : 'bg-rose-500'
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>

            <p className="text-[10px] text-slate-400 text-center pt-2 border-t border-slate-100">
              Klik tanggal dengan titik merah untuk memfilter tugas pada hari tersebut.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
