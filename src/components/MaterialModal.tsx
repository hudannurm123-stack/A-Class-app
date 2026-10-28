import React, { useState, useEffect } from 'react';
import { Course, Material } from '../types';
import { X, Save, FileText, Link as LinkIcon, Paperclip } from 'lucide-react';

interface MaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (material: Material) => void;
  courses: Course[];
  initialData?: Material | null;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({
  isOpen,
  onClose,
  onSave,
  courses,
  initialData,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [meetingNumber, setMeetingNumber] = useState<number>(1);
  const [category, setCategory] = useState<Material['category']>('slide');
  const [description, setDescription] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('3.5 MB');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCourseId(initialData.courseId);
      setMeetingNumber(initialData.meetingNumber);
      setCategory(initialData.category);
      setDescription(initialData.description);
      setExternalUrl(initialData.externalUrl || '');
      setTagsInput(initialData.tags ? initialData.tags.join(', ') : '');
      if (initialData.files && initialData.files[0]) {
        setFileName(initialData.files[0].name);
        setFileSize(initialData.files[0].size);
      } else {
        setFileName('');
      }
    } else {
      setTitle('');
      setCourseId(courses[0]?.id || '');
      setMeetingNumber(1);
      setCategory('slide');
      setDescription('');
      setExternalUrl('');
      setTagsInput('');
      setFileName('');
    }
  }, [initialData, courses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedCourse = courses.find((c) => c.id === courseId);
    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedMaterial: Material = {
      id: initialData ? initialData.id : `mat-${Date.now()}`,
      courseId,
      courseName: selectedCourse?.name || 'Mata Kuliah',
      meetingNumber: Number(meetingNumber) || 1,
      title: title.trim(),
      description: description.trim(),
      category,
      uploadDate: initialData ? initialData.uploadDate : 'Baru saja',
      externalUrl: externalUrl.trim() || undefined,
      tags: parsedTags,
      isBookmarked: initialData?.isBookmarked || false,
      author: initialData?.author || 'Dosen Pengampu / Komti',
      files: fileName.trim()
        ? [
            {
              id: `f-${Date.now()}`,
              name: fileName.trim(),
              size: fileSize,
              type: category === 'slide' ? 'pdf' : category,
            },
          ]
        : initialData?.files || [],
    };

    onSave(updatedMaterial);
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
            <h3 className="text-base font-bold text-slate-900">
              {initialData ? 'Edit Dokumen / Materi' : 'Tambah Materi & Link Perkuliahan'}
            </h3>
            <p className="text-xs text-slate-500">
              Dokumen akan otomatis terkatalog di Pusat Materi dan Class Space
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Judul Materi *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Slide Pertemuan 8 - REST API & Fetch Integration"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

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

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Pertemuan Ke- *
              </label>
              <input
                type="number"
                min="1"
                max="16"
                value={meetingNumber}
                onChange={(e) => setMeetingNumber(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kategori Materi
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="slide">Slide Presentasi (PPT/PDF)</option>
                <option value="pdf">Modul / E-Book PDF</option>
                <option value="video">Rekaman Video Kuliah</option>
                <option value="link">Link Eksternal / GitHub / Drive</option>
                <option value="exercise">Latihan Soal & Kuis</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tautan URL / Drive / GitHub
              </label>
              <input
                type="url"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Lampiran Nama Berkas (Opsional)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Nama berkas (e.g. Slide_08.pdf)"
                className="col-span-2 px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="Ukuran (3.5 MB)"
                className="col-span-1 px-3 py-2 text-xs rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Topik & Tags (pisahkan koma)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Contoh: REST API, Axios, JavaScript, Frontend"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Deskripsi & Panduan Belajar
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tuliskan ringkasan pokok bahasan atau instruksi khusus..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
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
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Materi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
