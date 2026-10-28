import React, { useState } from 'react';
import { Course, Announcement } from '../types';
import { X, Bell, Pin, Paperclip, Send } from 'lucide-react';

interface NewAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAnnouncement: (announcement: Announcement) => void;
  courses: Course[];
  defaultCourseId?: string;
}

export const NewAnnouncementModal: React.FC<NewAnnouncementModalProps> = ({
  isOpen,
  onClose,
  onAddAnnouncement,
  courses,
  defaultCourseId,
}) => {
  if (!isOpen) return null;

  const [courseId, setCourseId] = useState(defaultCourseId || courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<'Penting' | 'Materi' | 'Tugas' | 'Ruang Kelas' | 'Informasi'>('Penting');
  const [isPinned, setIsPinned] = useState(true);
  const [hasAttachment, setHasAttachment] = useState(false);
  const [attachmentName, setAttachmentName] = useState('Panduan_dan_Rubrik_UTS.pdf');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const course = courses.find((c) => c.id === courseId);

    const newAnnouncement: Announcement = {
      id: `ann-${Date.now()}`,
      courseId: courseId,
      courseName: course?.name || 'Mata Kuliah',
      title: title.trim(),
      content: content.trim(),
      author: 'Hudan Nur Mutaqin',
      authorRole: 'Komisaris Tingkat (Komti)',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      date: 'Baru saja',
      isPinned: isPinned,
      isNew: true,
      tag: tag,
      attachments: hasAttachment
        ? [
            {
              id: `att-${Date.now()}`,
              name: attachmentName,
              size: '1.4 MB',
              type: 'pdf',
            },
          ]
        : [],
    };

    onAddAnnouncement(newAnnouncement);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Buat Pengumuman Kelas Resmi</h3>
            <p className="text-xs text-slate-500">Informasi tersimpan permanen dan tidak tertimbun chat grup</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Pilih Mata Kuliah *
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.classGroup})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Judul Pengumuman *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Perubahan Jadwal Pertemuan & Link Zoom Hybrid"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kategori Label
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="Penting">Penting (Urgent)</option>
                <option value="Ruang Kelas">Perubahan Ruang</option>
                <option value="Materi">Materi Kuliah</option>
                <option value="Tugas">Tugas & Deadline</option>
                <option value="Informasi">Informasi Umum</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="flex items-center gap-1">
                  <Pin className="w-3.5 h-3.5 text-blue-600" />
                  Sematkan di Atas (Pin)
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Isi Pengumuman *
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tuliskan detail pengumuman resmi kelas di sini agar seluruh mahasiswa mendapatkan instruksi jelas..."
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={hasAttachment}
                onChange={(e) => setHasAttachment(e.target.checked)}
                className="rounded text-blue-600 w-4 h-4"
              />
              <span className="flex items-center gap-1">
                <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                Sertakan Dokumen Lampiran (PDF / Slide)
              </span>
            </label>

            {hasAttachment && (
              <input
                type="text"
                value={attachmentName}
                onChange={(e) => setAttachmentName(e.target.value)}
                placeholder="Nama file lampiran..."
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
              />
            )}
          </div>

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
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publikasikan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
