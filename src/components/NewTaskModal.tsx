import React, { useState } from 'react';
import { Course, GroupProject, Task, Priority, TaskStatus } from '../types';
import { X, Plus, Trash2, Calendar, User, CheckSquare } from 'lucide-react';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
  courses: Course[];
  groups: GroupProject[];
  defaultCourseId?: string;
  defaultGroupId?: string;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
  courses,
  groups,
  defaultCourseId,
  defaultGroupId,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState(defaultCourseId || courses[0]?.id || '');
  const [groupId, setGroupId] = useState(defaultGroupId || groups[0]?.id || '');
  const [isPersonal, setIsPersonal] = useState(false);
  const [assigneeName, setAssigneeName] = useState('Hudan Nur M.');
  const [dueDate, setDueDate] = useState('2025-11-05');
  const [priority, setPriority] = useState<Priority>('High');
  const [checklistItems, setChecklistItems] = useState<string[]>([
    'Sprint planning & review kriteria',
    'Eksekusi tugas',
    'Review hasil & kumpul',
  ]);
  const [newChecklistText, setNewChecklistText] = useState('');

  const handleAddChecklistItem = () => {
    if (newChecklistText.trim()) {
      setChecklistItems([...checklistItems, newChecklistText.trim()]);
      setNewChecklistText('');
    }
  };

  const handleRemoveChecklistItem = (idx: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedCourse = courses.find((c) => c.id === courseId);
    const selectedGroup = groups.find((g) => g.id === groupId);

    const newTask: Task = {
      id: `tsk-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      courseId: courseId,
      courseName: selectedCourse ? selectedCourse.name : 'Umum',
      groupId: isPersonal ? undefined : groupId,
      groupName: isPersonal ? undefined : selectedGroup?.name,
      assigneeName: assigneeName.trim() || 'Hudan Nur M.',
      dueDate: dueDate,
      daysLeftText: '3 hari lagi',
      status: 'todo' as TaskStatus,
      priority: priority,
      progressPercent: 0,
      isPersonal: isPersonal,
      storyPoints: 3,
      checklist: checklistItems.map((text, idx) => ({
        id: `chk-${Date.now()}-${idx}`,
        title: text,
        completed: false,
      })),
      attachments: [],
      comments: [],
    };

    onAddTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Buat Tugas Baru</h3>
            <p className="text-xs text-slate-500">Agile task untuk kelompok atau aktivitas pribadi</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4">
          {/* Tipe Tugas */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setIsPersonal(false)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                !isPersonal ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tugas Kelompok (Workspace)
            </button>
            <button
              type="button"
              onClick={() => setIsPersonal(true)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                isPersonal ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tugas Pribadi
            </button>
          </div>

          {/* Judul Tugas */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Judul Tugas / Sprint Item *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Desain Prototype Interaktif High-Fidelity"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Mata Kuliah & Kelompok */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mata Kuliah *
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {!isPersonal && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Proyek Kelompok *
                </label>
                <select
                  value={groupId}
                  onChange={(e) => setGroupId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Penanggung Jawab & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Penanggung Jawab (Assignee)
              </label>
              <input
                type="text"
                value={assigneeName}
                onChange={(e) => setAssigneeName(e.target.value)}
                placeholder="Nama anggota tim..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tenggat Waktu (Deadline)
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Prioritas */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Prioritas Tugas
            </label>
            <div className="flex gap-2">
              {(['Urgent', 'High', 'Medium', 'Normal'] as Priority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    priority === p
                      ? p === 'Urgent'
                        ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
                        : p === 'High'
                        ? 'bg-amber-50 border-amber-300 text-amber-700 font-bold'
                        : 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Deskripsi & Catatan
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan spesifikasi detail atau kriteria penerimaan (Acceptance Criteria)..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Checklist Sub-tasks */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Checklist Sub-Tugas ({checklistItems.length})
            </label>
            <div className="space-y-1.5 mb-2">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between px-3 py-1.5 bg-slate-50 rounded-lg text-xs border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveChecklistItem(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newChecklistText}
                onChange={(e) => setNewChecklistText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddChecklistItem();
                  }
                }}
                placeholder="Tambah item checklist (e.g. Wireframe, API docs)..."
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddChecklistItem}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah</span>
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
            >
              Simpan Tugas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
