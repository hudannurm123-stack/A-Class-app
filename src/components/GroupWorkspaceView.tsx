import React, { useState } from 'react';
import { GroupProject, Task, TaskStatus } from '../types';
import { 
  Users, Plus, CheckSquare, Clock, ArrowRight, ArrowLeft, 
  MoreVertical, CheckCircle2, AlertTriangle, Layers, Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GroupWorkspaceViewProps {
  groups: GroupProject[];
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onOpenNewTask: () => void;
  onUpdateTask: (task: Task) => void;
}

export const GroupWorkspaceView: React.FC<GroupWorkspaceViewProps> = ({
  groups,
  tasks,
  onSelectTask,
  onOpenNewTask,
  onUpdateTask,
}) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(groups[0]?.id || '');

  const activeGroup = groups.find((g) => g.id === selectedGroupId) || groups[0];

  // Tasks belonging to this group
  const groupTasks = tasks.filter((t) => t.groupId === activeGroup?.id);

  const todoTasks = groupTasks.filter((t) => t.status === 'todo');
  const inProgressTasks = groupTasks.filter((t) => t.status === 'inprogress');
  const doneTasks = groupTasks.filter((t) => t.status === 'done');

  // Dynamic progress calculation
  const totalTasks = groupTasks.length;
  const currentProgress = totalTasks > 0 
    ? Math.round((doneTasks.length / totalTasks) * 100) 
    : (activeGroup?.progress || 0);

  const handleMoveTask = (task: Task, targetStatus: TaskStatus) => {
    let newProgress = task.progressPercent;
    if (targetStatus === 'done') {
      newProgress = 100;
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else if (targetStatus === 'todo' && task.progressPercent === 100) {
      newProgress = 0;
    } else if (targetStatus === 'inprogress' && task.progressPercent === 0) {
      newProgress = 50;
    }

    onUpdateTask({
      ...task,
      status: targetStatus,
      progressPercent: newProgress,
    });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Workspace Header & Project Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <Users className="w-4 h-4" />
              <span>Agile Group Workspace · Sprint Board</span>
            </div>
            {/* Project Dropdown */}
            <div className="flex items-center gap-2 pt-1">
              <select
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
                className="text-base sm:text-lg font-bold text-slate-900 bg-transparent border-0 border-b-2 border-blue-500 py-1 pr-6 focus:ring-0 focus:border-blue-700 cursor-pointer"
              >
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>{g.name} ({g.courseName})</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={onOpenNewTask}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Buat Tugas</span>
          </button>
        </div>

        {/* Project Meta, Members Avatars & Sprint Progress */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3 border-t border-slate-100 items-center">
          {/* Members Avatars (6 cols) */}
          <div className="md:col-span-6 flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden py-1">
              {activeGroup?.members.map((member, i) => (
                <div
                  key={i}
                  title={`${member.name} (${member.role})`}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 transition-transform"
                >
                  {member.name.charAt(0)}
                </div>
              ))}
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {activeGroup?.members.length} anggota tim aktif
            </span>
          </div>

          {/* Progress Bar (6 cols) */}
          <div className="md:col-span-6 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Progress Sprint Kelompok</span>
              <span className="font-extrabold text-blue-600">{currentProgress}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Agile Kanban Board: 3 Columns [To Do, In Progress, Done] */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column 1: To Do */}
        <div className="bg-slate-100/70 rounded-2xl p-4 flex flex-col space-y-3 border border-slate-200/80">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">To Do</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 shadow-2xs">
              {todoTasks.length}
            </span>
          </div>

          <div className="space-y-2.5 flex-1 min-h-[300px]">
            {todoTasks.length === 0 ? (
              <div className="h-32 border border-dashed border-slate-300 rounded-xl flex items-center justify-center text-xs text-slate-400">
                Tidak ada tugas di kolom To Do
              </div>
            ) : (
              todoTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all space-y-2.5 cursor-pointer group"
                  onClick={() => onSelectTask(task)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-blue-600 truncate max-w-[140px]">
                      {task.courseName}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {task.daysLeftText}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {task.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                        {task.assigneeName.charAt(0)}
                      </div>
                      <span className="truncate max-w-[100px]">{task.assigneeName}</span>
                    </div>

                    {/* Move to In Progress quick action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveTask(task, 'inprogress');
                      }}
                      className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors flex items-center gap-1 text-[10px] font-semibold"
                      title="Mulai kerjakan (Pindah ke In Progress)"
                    >
                      <span>Mulai</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="bg-blue-50/50 rounded-2xl p-4 flex flex-col space-y-3 border border-blue-200/80">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <h3 className="text-xs sm:text-sm font-bold text-blue-900">In Progress</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white text-blue-700 shadow-2xs">
              {inProgressTasks.length}
            </span>
          </div>

          <div className="space-y-2.5 flex-1 min-h-[300px]">
            {inProgressTasks.length === 0 ? (
              <div className="h-32 border border-dashed border-blue-200 rounded-xl flex items-center justify-center text-xs text-blue-400">
                Tidak ada tugas sedang dikerjakan
              </div>
            ) : (
              inProgressTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-3.5 rounded-xl border border-blue-200 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all space-y-2.5 cursor-pointer group"
                  onClick={() => onSelectTask(task)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-blue-600 truncate max-w-[140px]">
                      {task.courseName}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                      {task.daysLeftText}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {task.title}
                  </h4>

                  {/* Micro Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Checklist: {task.checklist.filter(c => c.completed).length}/{task.checklist.length}</span>
                      <span>{task.progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${task.progressPercent}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center">
                        {task.assigneeName.charAt(0)}
                      </div>
                      <span className="truncate max-w-[100px]">{task.assigneeName}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveTask(task, 'todo');
                        }}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition-colors"
                        title="Kembalikan ke To Do"
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoveTask(task, 'done');
                        }}
                        className="p-1 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded transition-colors flex items-center gap-1 text-[10px] font-bold"
                        title="Tandai selesai"
                      >
                        <span>Done</span>
                        <CheckCircle2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Done */}
        <div className="bg-emerald-50/50 rounded-2xl p-4 flex flex-col space-y-3 border border-emerald-200/80">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-xs sm:text-sm font-bold text-emerald-900">Done</h3>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white text-emerald-700 shadow-2xs">
              {doneTasks.length}
            </span>
          </div>

          <div className="space-y-2.5 flex-1 min-h-[300px]">
            {doneTasks.length === 0 ? (
              <div className="h-32 border border-dashed border-emerald-200 rounded-xl flex items-center justify-center text-xs text-emerald-400">
                Belum ada tugas selesai
              </div>
            ) : (
              doneTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-xs transition-all space-y-2.5 cursor-pointer group hover:border-emerald-300"
                  onClick={() => onSelectTask(task)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-emerald-700 truncate max-w-[140px]">
                      {task.courseName}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Tuntas
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-through text-slate-500">
                    {task.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">
                        {task.assigneeName.charAt(0)}
                      </div>
                      <span className="truncate max-w-[100px]">{task.assigneeName}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveTask(task, 'inprogress');
                      }}
                      className="p-1 text-slate-400 hover:text-blue-600 rounded hover:bg-slate-100 transition-colors text-[10px]"
                      title="Kembalikan ke In Progress"
                    >
                      Buka Kembali
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
