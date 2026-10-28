import React, { useState } from 'react';
import { Course, Announcement, Material, Task } from '../types';
import { 
  Search, Plus, Pin, Download, FileText, Calendar, 
  User, MapPin, Clock, CheckCircle2, ChevronRight, 
  ExternalLink, ArrowLeft, Archive, Layers
} from 'lucide-react';

interface ClassSpaceViewProps {
  courses: Course[];
  announcements: Announcement[];
  materials: Material[];
  tasks: Task[];
  onOpenNewAnnouncement: (courseId: string) => void;
  onSelectTask: (task: Task) => void;
}

export const ClassSpaceView: React.FC<ClassSpaceViewProps> = ({
  courses,
  announcements,
  materials,
  tasks,
  onOpenNewAnnouncement,
  onSelectTask,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'archived'>('active');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [courseSubTab, setCourseSubTab] = useState<'pengumuman' | 'materi' | 'tugas' | 'info'>('pengumuman');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.code.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterTab === 'archived') return matchesSearch && c.isArchived;
    if (filterTab === 'active') return matchesSearch && !c.isArchived;
    return matchesSearch;
  });

  const courseAnnouncements = announcements.filter((a) => a.courseId === selectedCourse?.id);
  const courseMaterials = materials.filter((m) => m.courseId === selectedCourse?.id);
  const courseTasks = tasks.filter((t) => t.courseId === selectedCourse?.id);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setMobileDetailOpen(true);
  };

  return (
    <div className="space-y-5 pb-20 md:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Class Space</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Akses semua informasi akademik, materi per pertemuan, dan pengumuman dalam satu tempat terpadu.
          </p>
        </div>

        <button
          onClick={() => onOpenNewAnnouncement(selectedCourse?.id || courses[0]?.id)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat Pengumuman</span>
        </button>
      </div>

      {/* Main 2-Column Split: Courses List & Course Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Course Directory (4 cols desktop, hidden on mobile if detail open) */}
        <div className={`lg:col-span-4 space-y-3 ${mobileDetailOpen ? 'hidden lg:block' : 'block'}`}>
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setFilterTab('all')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilterTab('active')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterTab === 'active' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Aktif
            </button>
            <button
              onClick={() => setFilterTab('archived')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterTab === 'archived' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Arsip
            </button>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari mata kuliah..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
            />
          </div>

          {/* Courses List Cards */}
          <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-0.5">
            {filteredCourses.map((course) => {
              const isSelected = selectedCourse?.id === course.id;
              return (
                <div
                  key={course.id}
                  onClick={() => handleSelectCourse(course.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-400 shadow-xs ring-1 ring-blue-400/30'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-xs"
                      style={{ backgroundColor: course.color }}
                    >
                      {course.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-xs sm:text-sm font-bold truncate ${
                        isSelected ? 'text-blue-900' : 'text-slate-900'
                      }`}>
                        {course.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {course.classGroup}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span>{course.announcementsCount} pengumuman</span>
                        <span>·</span>
                        <span>{course.tasksCount} tugas</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-300'
                  }`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Course Space Detail (8 cols desktop) */}
        <div className={`lg:col-span-8 space-y-4 ${mobileDetailOpen ? 'block' : 'hidden lg:block'}`}>
          {/* Mobile Back to List Button */}
          <div className="lg:hidden mb-2">
            <button
              onClick={() => setMobileDetailOpen(false)}
              className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Daftar Mata Kuliah</span>
            </button>
          </div>

          {selectedCourse && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
              {/* Course Banner Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base text-white shadow-sm shrink-0"
                    style={{ backgroundColor: selectedCourse.color }}
                  >
                    {selectedCourse.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-blue-600">{selectedCourse.code}</span>
                      <span>·</span>
                      <span>{selectedCourse.classGroup}</span>
                      <span>·</span>
                      <span>{selectedCourse.semester}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {selectedCourse.name}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => onOpenNewAnnouncement(selectedCourse.id)}
                  className="px-3.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs rounded-xl border border-blue-200 transition-colors self-start sm:self-auto"
                >
                  + Pengumuman Baru
                </button>
              </div>

              {/* Sub-tabs: Pengumuman | Materi | Tugas | Info Mata Kuliah */}
              <div className="flex items-center gap-1 border-b border-slate-200 pb-1 overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => setCourseSubTab('pengumuman')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    courseSubTab === 'pengumuman'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Pengumuman ({courseAnnouncements.length})
                </button>
                <button
                  onClick={() => setCourseSubTab('materi')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    courseSubTab === 'materi'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Materi Kuliah ({courseMaterials.length})
                </button>
                <button
                  onClick={() => setCourseSubTab('tugas')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    courseSubTab === 'tugas'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Tugas ({courseTasks.length})
                </button>
                <button
                  onClick={() => setCourseSubTab('info')}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    courseSubTab === 'info'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Info Kuliah & Dosen
                </button>
              </div>

              {/* Tab Content 1: Pengumuman */}
              {courseSubTab === 'pengumuman' && (
                <div className="space-y-3.5">
                  {courseAnnouncements.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      <p className="text-xs text-slate-500">Belum ada pengumuman untuk mata kuliah ini.</p>
                      <button
                        onClick={() => onOpenNewAnnouncement(selectedCourse.id)}
                        className="mt-2 text-xs text-blue-600 font-semibold"
                      >
                        + Tambahkan pengumuman pertama
                      </button>
                    </div>
                  ) : (
                    courseAnnouncements.map((ann) => (
                      <div
                        key={ann.id}
                        className={`p-4 rounded-xl border transition-all ${
                          ann.isPinned 
                            ? 'bg-white border-blue-200 shadow-xs ring-1 ring-blue-100' 
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            {ann.isPinned && (
                              <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                <Pin className="w-3 h-3" />
                                Pinned
                              </span>
                            )}
                            {ann.tag && (
                              <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                                {ann.tag}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">{ann.date}</span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 mb-1.5">{ann.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">{ann.content}</p>

                        {/* Attachments if any */}
                        {ann.attachments && ann.attachments.length > 0 && (
                          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5 mb-3">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              Lampiran Berkas ({ann.attachments.length}):
                            </p>
                            {ann.attachments.map((file) => (
                              <div key={file.id} className="flex items-center justify-between text-xs py-1">
                                <div className="flex items-center gap-2 text-slate-700">
                                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                                  <span className="font-medium truncate max-w-xs">{file.name}</span>
                                  <span className="text-[10px] text-slate-400">({file.size})</span>
                                </div>
                                <button
                                  onClick={() => alert(`Mengunduh berkas: ${file.name}`)}
                                  className="text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                  <Download className="w-3 h-3" />
                                  Unduh
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                          <span>Diposting oleh: <strong className="text-slate-700">{ann.author}</strong> ({ann.authorRole})</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab Content 2: Materi Kuliah */}
              {courseSubTab === 'materi' && (
                <div className="space-y-3">
                  {courseMaterials.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      <p className="text-xs text-slate-500">Materi belum diunggah untuk kelas ini.</p>
                    </div>
                  ) : (
                    courseMaterials.map((mat) => (
                      <div
                        key={mat.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-200 transition-all space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                            Pertemuan {mat.meetingNumber}
                          </span>
                          <span className="text-[11px] text-slate-400">{mat.uploadDate}</span>
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">{mat.title}</h4>
                          <p className="text-xs text-slate-600 mt-0.5">{mat.description}</p>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-slate-100">
                          {mat.files.map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                            >
                              <div className="flex items-center gap-2 text-xs text-slate-800">
                                <FileText className="w-3.5 h-3.5 text-blue-600" />
                                <span className="font-medium truncate max-w-xs">{file.name}</span>
                                <span className="text-[10px] text-slate-400">({file.size})</span>
                              </div>
                              <button
                                onClick={() => alert(`Mengunduh materi: ${file.name}`)}
                                className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 bg-white rounded border border-slate-200 hover:bg-blue-50 transition-colors flex items-center gap-1"
                              >
                                <Download className="w-3 h-3" />
                                Unduh
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab Content 3: Tugas Kuliah */}
              {courseSubTab === 'tugas' && (
                <div className="space-y-2.5">
                  {courseTasks.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      <p className="text-xs text-slate-500">Tidak ada tugas aktif untuk mata kuliah ini.</p>
                    </div>
                  ) : (
                    courseTasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => onSelectTask(t)}
                        className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                              t.status === 'done' 
                                ? 'bg-emerald-50 text-emerald-700' 
                                : t.status === 'inprogress' 
                                ? 'bg-blue-50 text-blue-700' 
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {t.status === 'done' ? 'Selesai' : t.status === 'inprogress' ? 'In Progress' : 'To Do'}
                            </span>
                            <span className="text-[11px] text-slate-400">Tenggat: {t.dueDate}</span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">{t.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">PJ: {t.assigneeName}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab Content 4: Info Kuliah & Dosen */}
              {courseSubTab === 'info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        <span>Dosen Pengampu</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900">{selectedCourse.lecturer}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>Jadwal & Waktu</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900">{selectedCourse.dayTime}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 sm:col-span-2">
                      <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>Ruang Perkuliahan</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900">{selectedCourse.room}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 text-xs text-blue-900">
                    <p className="font-bold mb-1">Sistem Penilaian Kelas Terpadu:</p>
                    <ul className="list-disc pl-4 space-y-0.5 text-blue-800 text-[11px]">
                      <li>Kehadiran & Keaktifan: 10%</li>
                      <li>Tugas Mandiri & Kuis: 20%</li>
                      <li>Tugas Proyek Kelompok Agile: 30%</li>
                      <li>Ujian Tengah Semester (UTS): 20%</li>
                      <li>Ujian Akhir Semester (UAS): 20%</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
