import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';
import { 
  X, CheckSquare, Calendar, User, FileText, MessageSquare, 
  Send, AlertCircle, ArrowLeft, Paperclip, CheckCircle2, Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TaskDetailModalProps {
  task: Task | null;
  onClose: () => void;
  onUpdateTask: (updatedTask: Task) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  onClose,
  onUpdateTask,
}) => {
  if (!task) return null;

  const [activeTab, setActiveTab] = useState<'deskripsi' | 'checklist' | 'lampiran' | 'komentar'>('deskripsi');
  const [commentText, setCommentText] = useState('');

  const toggleChecklist = (checkId: string) => {
    const updatedChecklist = task.checklist.map((item) => {
      if (item.id === checkId) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    const completedCount = updatedChecklist.filter((c) => c.completed).length;
    const totalCount = updatedChecklist.length;
    const newProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : task.progressPercent;

    let newStatus: TaskStatus = task.status;
    if (newProgress === 100) {
      newStatus = 'done';
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else if (newProgress > 0 && task.status === 'todo') {
      newStatus = 'inprogress';
    }

    onUpdateTask({
      ...task,
      checklist: updatedChecklist,
      progressPercent: newProgress,
      status: newStatus,
    });
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    let newProgress = task.progressPercent;
    if (newStatus === 'done') {
      newProgress = 100;
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } else if (newStatus === 'todo' && task.progressPercent === 100) {
      newProgress = 0;
    }
    onUpdateTask({
      ...task,
      status: newStatus,
      progressPercent: newProgress,
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `cm-${Date.now()}`,
      author: 'Hudan Nur M.',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      content: commentText.trim(),
      timestamp: 'Baru saja',
    };

    onUpdateTask({
      ...task,
      comments: [...task.comments, newComment],
    });
    setCommentText('');
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'done':
        return { text: 'Done', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'inprogress':
        return { text: 'In Progress', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      default:
        return { text: 'To Do', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const statusInfo = getStatusBadge(task.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-white">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          
          <div className="flex items-center gap-2">
            {/* Status Selector */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => handleStatusChange('todo')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  task.status === 'todo' ? 'bg-white text-slate-800 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                To Do
              </button>
              <button
                onClick={() => handleStatusChange('inprogress')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  task.status === 'inprogress' ? 'bg-blue-600 text-white shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => handleStatusChange('done')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  task.status === 'done' ? 'bg-emerald-600 text-white shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Done
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Title & Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-medium mb-1">
              <span>{task.courseName}</span>
              {task.groupName && (
                <>
                  <span className="text-slate-300">·</span>
                  <span>{task.groupName}</span>
                </>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {task.title}
            </h2>
          </div>

          {/* Key Task Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <p className="text-[11px] font-medium text-slate-500">Penanggung Jawab</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center shrink-0">
                  {task.assigneeName.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-slate-800 truncate">
                  {task.assigneeName}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-slate-500">Tenggat Waktu</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-slate-800">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{task.dueDate}</span>
                <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-semibold ml-1">
                  {task.daysLeftText}
                </span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                <span>Progres Selesai</span>
                <span className="font-semibold text-slate-800">{task.progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    task.progressPercent === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${task.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 border-b border-slate-200 pb-1">
            <button
              onClick={() => setActiveTab('deskripsi')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'deskripsi'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Deskripsi
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'checklist'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>Checklist</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
                {task.checklist.filter(c => c.completed).length}/{task.checklist.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('lampiran')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'lampiran'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>Lampiran</span>
              {task.attachments.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
                  {task.attachments.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('komentar')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'komentar'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>Komentar</span>
              {task.comments.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
                  {task.comments.length}
                </span>
              )}
            </button>
          </div>

          {/* Tab 1: Deskripsi */}
          {activeTab === 'deskripsi' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {task.description || 'Tidak ada deskripsi detail untuk tugas ini.'}
              </p>

              <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/50 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div className="text-xs text-blue-900">
                  <p className="font-semibold">Agile Scrum Guideline:</p>
                  <p className="text-blue-700 mt-0.5">
                    Pastikan setiap checklist diselesaikan sebelum memindahkan tiket ke status <b>Done</b> agar Definition of Done (DoD) terpenuhi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Checklist */}
          {activeTab === 'checklist' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Klik sub-tugas untuk memperbarui progres otomatis</span>
                <span className="font-medium text-blue-600">
                  {task.checklist.filter(c => c.completed).length} dari {task.checklist.length} tuntas
                </span>
              </div>

              {task.checklist.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4 text-center">Belum ada item checklist.</p>
              ) : (
                task.checklist.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleChecklist(item.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      item.completed 
                        ? 'bg-slate-50/80 border-slate-200 text-slate-400 line-through' 
                        : 'bg-white border-slate-200 hover:border-blue-300 text-slate-800 shadow-xs'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                      item.completed 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'border-slate-300 bg-white hover:border-blue-500'
                    }`}>
                      {item.completed && <CheckSquare className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-medium leading-normal">{item.title}</span>
                  </button>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Lampiran */}
          {activeTab === 'lampiran' && (
            <div className="space-y-3">
              {task.attachments.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <Paperclip className="w-6 h-6 text-slate-300 mx-auto mb-1" />
                  <p className="text-xs text-slate-500">Belum ada lampiran file</p>
                </div>
              ) : (
                task.attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {file.name.split('.').pop()?.toUpperCase() || 'FILE'}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{file.name}</p>
                        <p className="text-[11px] text-slate-400">{file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Mengunduh file: ${file.name}`)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Unduh
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 4: Komentar Diskusi */}
          {activeTab === 'komentar' && (
            <div className="space-y-4">
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {task.comments.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6 italic">Belum ada diskusi untuk tugas ini.</p>
                ) : (
                  task.comments.map((cm) => (
                    <div key={cm.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">{cm.author}</span>
                        <span className="text-[10px] text-slate-400">{cm.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{cm.content}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Form Input Komentar */}
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Tulis komentar atau progres tim..."
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
