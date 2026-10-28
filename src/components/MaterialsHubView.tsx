import React, { useState } from 'react';
import { Course, Material, MaterialCategory } from '../types';
import { 
  Search, Filter, Bookmark, BookmarkCheck, Download, 
  ExternalLink, FileText, Video, Presentation, HelpCircle, 
  Plus, Check, Copy, Sparkles, BookOpen, Clock, Tag
} from 'lucide-react';

interface MaterialsHubViewProps {
  courses: Course[];
  materials: Material[];
  onToggleBookmark: (materialId: string) => void;
  onOpenAddMaterial: () => void;
  onNavigateToCourse: (courseId: string) => void;
}

export const MaterialsHubView: React.FC<MaterialsHubViewProps> = ({
  courses,
  materials,
  onToggleBookmark,
  onOpenAddMaterial,
  onNavigateToCourse,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (mat: Material) => {
    const textToCopy = mat.externalUrl || `https://aclass.edu/materials/${mat.id}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedId(mat.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: Material['category']) => {
    switch (category) {
      case 'slide':
        return <Presentation className="w-4 h-4 text-blue-600" />;
      case 'pdf':
        return <FileText className="w-4 h-4 text-emerald-600" />;
      case 'video':
        return <Video className="w-4 h-4 text-rose-600" />;
      case 'link':
        return <ExternalLink className="w-4 h-4 text-violet-600" />;
      case 'exercise':
        return <HelpCircle className="w-4 h-4 text-amber-600" />;
      default:
        return <FileText className="w-4 h-4 text-blue-600" />;
    }
  };

  const getCategoryLabel = (category: Material['category']) => {
    switch (category) {
      case 'slide': return 'Slide Presentasi';
      case 'pdf': return 'Modul / Dokumen PDF';
      case 'video': return 'Video Rekaman Kuliah';
      case 'link': return 'Link & Repo Eksternal';
      case 'exercise': return 'Latihan Soal & Kuis';
      default: return 'Dokumen';
    }
  };

  // Filter materials based on search, course, category, and bookmarks
  const filteredMaterials = materials.filter((mat) => {
    const matchesSearch = 
      mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mat.courseName && mat.courseName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (mat.author && mat.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (mat.tags && mat.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCourse = selectedCourseFilter === 'all' || mat.courseId === selectedCourseFilter;
    const matchesCategory = selectedCategory === 'all' || mat.category === selectedCategory;
    const matchesBookmark = !onlyBookmarked || mat.isBookmarked;

    return matchesSearch && matchesCourse && matchesCategory && matchesBookmark;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#101E42] via-[#1E3A8A] to-[#3563F5] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-300" />
            <span>Pusat Materi & Arsip Terpadu</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Pusat Materi Perkuliahan
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-xl">
            Cari, simpan, dan kategorikan dokumen slide, modul PDF, rekaman kuliah, serta repository kode mata kuliah dalam satu direktori terpusat tanpa takut link tenggelam di chat WhatsApp.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAddMaterial}
              className="px-4 py-2 bg-white text-blue-900 font-bold text-xs rounded-xl shadow-xs hover:bg-blue-50 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Materi Baru</span>
            </button>
            <button
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                onlyBookmarked 
                  ? 'bg-amber-400 text-slate-900 shadow-xs' 
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{onlyBookmarked ? 'Menampilkan Tersimpan' : 'Hanya Materi Favorit'}</span>
            </button>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full bg-blue-400/10 blur-2xl pointer-events-none" />
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search input & course dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari materi berdasarkan judul, topik (misal: REST API, Heuristics), dosen, atau file..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
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

          <div className="sm:col-span-4">
            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              <option value="all">Semua Mata Kuliah ({courses.length})</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pt-1">
          <span className="text-xs text-slate-400 font-semibold mr-1 shrink-0">Kategori:</span>
          {[
            { id: 'all', label: 'Semua Tipe' },
            { id: 'slide', label: 'Slide Presentasi' },
            { id: 'pdf', label: 'Modul & PDF' },
            { id: 'video', label: 'Video Rekaman' },
            { id: 'link', label: 'Link & Repo' },
            { id: 'exercise', label: 'Latihan & Kuis' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as MaterialCategory)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Menemukan <strong>{filteredMaterials.length}</strong> materi pembelajaran</span>
        {(selectedCourseFilter !== 'all' || selectedCategory !== 'all' || searchQuery || onlyBookmarked) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCourseFilter('all');
              setSelectedCategory('all');
              setOnlyBookmarked(false);
            }}
            className="text-blue-600 font-semibold hover:underline"
          >
            Reset Semua Filter
          </button>
        )}
      </div>

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-slate-200 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">Materi tidak ditemukan</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Coba ganti kata kunci pencarian atau reset filter mata kuliah dan kategori di atas.
            </p>
          </div>
        ) : (
          filteredMaterials.map((mat) => {
            const courseObj = courses.find((c) => c.id === mat.courseId);
            return (
              <div
                key={mat.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-4 group"
              >
                <div>
                  {/* Card Header: Category & Course Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                        {getCategoryIcon(mat.category)}
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        Pertemuan {mat.meetingNumber} · {getCategoryLabel(mat.category)}
                      </span>
                    </div>

                    {/* Bookmark Star Toggle */}
                    <button
                      onClick={() => onToggleBookmark(mat.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        mat.isBookmarked 
                          ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' 
                          : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                      }`}
                      title={mat.isBookmarked ? 'Hapus dari favorit' : 'Simpan ke favorit'}
                    >
                      <Bookmark className={`w-4 h-4 ${mat.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Course Name */}
                  <button
                    onClick={() => onNavigateToCourse(mat.courseId)}
                    className="text-xs font-semibold text-blue-600 hover:underline mb-1 block text-left"
                  >
                    {courseObj?.name || mat.courseName || 'Mata Kuliah'}
                  </button>

                  {/* Title & Description */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {mat.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-3 leading-relaxed">
                    {mat.description}
                  </p>

                  {/* Tags */}
                  {mat.tags && mat.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {mat.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 font-medium">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Files List if any */}
                  {mat.files && mat.files.length > 0 && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Berkas Unduhan ({mat.files.length}):
                      </p>
                      {mat.files.map((file) => (
                        <div key={file.id} className="flex items-center justify-between text-xs py-0.5">
                          <div className="flex items-center gap-1.5 text-slate-700 truncate mr-2">
                            <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span className="truncate font-medium">{file.name}</span>
                            <span className="text-[10px] text-slate-400">({file.size})</span>
                          </div>
                          <button
                            onClick={() => alert(`Mengunduh file: ${file.name}`)}
                            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 shrink-0"
                          >
                            Unduh
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Metadata and Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <div className="text-[11px] text-slate-400">
                    <span>{mat.uploadDate}</span>
                    {mat.author && <span> · {mat.author}</span>}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyLink(mat)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                      title="Salin tautan materi"
                    >
                      {copiedId === mat.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {mat.externalUrl && (
                      <a
                        href={mat.externalUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg text-xs flex items-center gap-1 transition-colors"
                      >
                        <span>Buka Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
