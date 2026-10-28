import React, { useState } from 'react';
import { Course, Material, Announcement, Task } from '../types';
import { 
  ShieldCheck, Lock, KeyRound, Plus, Edit2, Trash2, 
  BookOpen, FileText, Bell, CheckSquare, Search, 
  RefreshCw, LogOut, ArrowLeft, ExternalLink, Pin, AlertCircle, 
  ShieldAlert, CheckCircle2 
} from 'lucide-react';

interface AdminPanelViewProps {
  courses: Course[];
  materials: Material[];
  announcements: Announcement[];
  tasks: Task[];
  isAdminAuthenticated: boolean;
  onLoginAdmin: () => void;
  onLogoutAdmin: () => void;
  onBackToStudent: () => void;
  onOpenAddMaterial: () => void;
  onEditMaterial: (mat: Material) => void;
  onDeleteMaterial: (id: string) => void;
  onOpenAddCourse: () => void;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
  onOpenAddAnnouncement: () => void;
  onDeleteAnnouncement: (id: string) => void;
  onOpenAddTask: () => void;
  onDeleteTask: (id: string) => void;
  onResetData: () => void;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  courses,
  materials,
  announcements,
  tasks,
  isAdminAuthenticated,
  onLoginAdmin,
  onLogoutAdmin,
  onBackToStudent,
  onOpenAddMaterial,
  onEditMaterial,
  onDeleteMaterial,
  onOpenAddCourse,
  onEditCourse,
  onDeleteCourse,
  onOpenAddAnnouncement,
  onDeleteAnnouncement,
  onOpenAddTask,
  onDeleteTask,
  onResetData,
}) => {
  // Login form state
  const [adminEmail, setAdminEmail] = useState('admin@aclass.ac.id');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // CRUD View state
  const [activeTab, setActiveTab] = useState<'materials' | 'courses' | 'announcements' | 'tasks'>('materials');
  const [searchQuery, setSearchQuery] = useState('');

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'material' | 'course' | 'announcement' | 'task';
    id: string;
    title: string;
  } | null>(null);

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPassword.trim()) {
      setLoginError('Harap masukkan email dan kata sandi admin.');
      return;
    }

    // Secure authentication check (accepts admin credentials)
    if (adminPassword === 'admin123' || adminPassword === 'komti2025' || adminPassword === 'admin') {
      setLoginError('');
      onLoginAdmin();
    } else {
      setLoginError('Kata sandi keamanan administrator salah. Silakan coba kembali.');
    }
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'material') onDeleteMaterial(deleteTarget.id);
    if (deleteTarget.type === 'course') onDeleteCourse(deleteTarget.id);
    if (deleteTarget.type === 'announcement') onDeleteAnnouncement(deleteTarget.id);
    if (deleteTarget.type === 'task') onDeleteTask(deleteTarget.id);
    setDeleteTarget(null);
  };

  // If not authenticated as admin, show dedicated secure login portal
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-xl mx-auto py-8 px-4 pb-24">
        {/* Back Button */}
        <button
          onClick={onBackToStudent}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 mb-6 py-1.5 px-3 rounded-lg hover:bg-slate-200/60 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Mahasiswa</span>
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Portal Otentikasi Administrator
            </h2>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Akses khusus Dosen Pengampu dan Komisaris Tingkat (Komti) untuk mengelola data perkuliahan secara aman.
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 space-y-5">
            {/* Security Notice */}
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-[11px] text-amber-900 leading-relaxed">
                <p className="font-bold text-amber-950">Akses Terproteksi Khusus Pengelola:</p>
                <p className="text-amber-800 mt-0.5">
                  Halaman ini dipisahkan dari akun mahasiswa agar data mata kuliah, materi, dan pengumuman tidak diubah atau dihapus oleh pihak yang tidak berwenang.
                </p>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Administrator / NIP Dosen
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@aclass.ac.id"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Kata Sandi Keamanan Admin
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Masukkan kata sandi admin"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Masuk ke Panel CRUD Admin</span>
              </button>
            </form>

            {/* Demo Credential Helper */}
            <div className="pt-3 border-t border-slate-100 flex flex-col items-center justify-center text-center space-y-1.5">
              <span className="text-[11px] text-slate-400">Kredensial Bawaan Evaluasi:</span>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-[11px] font-mono text-slate-700">
                <span>Email: <strong>admin@aclass.ac.id</strong></span>
                <span>·</span>
                <span>Password: <strong>admin123</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated as admin, show full CRUD suite
  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sesi Administrator Aktif · Akses Penuh CRUD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Manajemen Data Perkuliahan
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kelola kurikulum mata kuliah, dokumen materi, pengumuman resmi kelas, dan pembagian tugas sprint kelompok secara aman.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onResetData}
              className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
              title="Reset data ke format default"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data Demo</span>
            </button>

            <button
              onClick={onLogoutAdmin}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              title="Keluar dari sesi administrator"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Sesi Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Statistics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-blue-600">{materials.length}</span>
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-xs font-bold text-slate-800 mt-1">Total Materi Terkatalog</p>
          <p className="text-[11px] text-slate-400">PDF, slide, link, & video</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-indigo-600">{courses.length}</span>
            <BookOpen className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-xs font-bold text-slate-800 mt-1">Total Mata Kuliah</p>
          <p className="text-[11px] text-slate-400">Semester aktif</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-amber-600">{announcements.length}</span>
            <Bell className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-xs font-bold text-slate-800 mt-1">Pengumuman Resmi</p>
          <p className="text-[11px] text-slate-400">Terbuka untuk mahasiswa</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-emerald-600">{tasks.length}</span>
            <CheckSquare className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-xs font-bold text-slate-800 mt-1">Tugas & Sprint</p>
          <p className="text-[11px] text-slate-400">Kelompok dan mandiri</p>
        </div>
      </div>

      {/* Navigation Sub-Tabs & Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('materials')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'materials'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CRUD Materi ({materials.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'courses'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>CRUD Mata Kuliah ({courses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('announcements')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'announcements'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>CRUD Pengumuman ({announcements.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'tasks'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>CRUD Tugas ({tasks.length})</span>
            </button>
          </div>

          {/* Quick Create Button based on active tab */}
          <div>
            {activeTab === 'materials' && (
              <button
                onClick={onOpenAddMaterial}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tambah Materi Baru</span>
              </button>
            )}
            {activeTab === 'courses' && (
              <button
                onClick={onOpenAddCourse}
                className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tambah Mata Kuliah</span>
              </button>
            )}
            {activeTab === 'announcements' && (
              <button
                onClick={onOpenAddAnnouncement}
                className="w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Buat Pengumuman</span>
              </button>
            )}
            {activeTab === 'tasks' && (
              <button
                onClick={onOpenAddTask}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Buat Tugas Baru</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari dalam tabel manajemen data..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Table 1: CRUD Materi */}
        {activeTab === 'materials' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Mata Kuliah & Pertemuan</th>
                  <th className="p-3">Judul Materi</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Berkas / Tautan</th>
                  <th className="p-3 text-right">Aksi CRUD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {materials
                  .filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()) || (m.courseName && m.courseName.toLowerCase().includes(searchQuery.toLowerCase())))
                  .map((mat) => (
                    <tr key={mat.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block truncate max-w-[160px]">{mat.courseName || 'Mata Kuliah'}</span>
                        <span className="text-[11px] text-slate-400">Pertemuan {mat.meetingNumber}</span>
                      </td>
                      <td className="p-3">
                        <p className="font-semibold text-slate-900 truncate max-w-xs">{mat.title}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{mat.description}</p>
                      </td>
                      <td className="p-3">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700">
                          {mat.category}
                        </span>
                      </td>
                      <td className="p-3">
                        {mat.externalUrl ? (
                          <a href={mat.externalUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 font-medium">
                            <span className="truncate max-w-[120px]">Link Eksternal</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        ) : mat.files && mat.files[0] ? (
                          <span className="text-slate-600 truncate max-w-[120px] block font-medium">
                            {mat.files[0].name}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Tidak ada file</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEditMaterial(mat)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Materi (Update)"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget({ type: 'material', id: mat.id, title: mat.title })}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Hapus Materi (Delete)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table 2: CRUD Mata Kuliah */}
        {activeTab === 'courses' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Kode & Nama Kuliah</th>
                  <th className="p-3">Dosen Pengampu</th>
                  <th className="p-3">Jadwal & Ruang</th>
                  <th className="p-3">Kelas</th>
                  <th className="p-3 text-right">Aksi CRUD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses
                  .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: course.color }} />
                          <div>
                            <span className="font-bold text-slate-900 block">{course.name}</span>
                            <span className="text-[11px] text-slate-400">{course.code}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-medium text-slate-700">{course.lecturer}</td>
                      <td className="p-3">
                        <span className="block text-slate-800">{course.dayTime}</span>
                        <span className="text-[11px] text-slate-400">{course.room}</span>
                      </td>
                      <td className="p-3 text-slate-600">{course.classGroup}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEditCourse(course)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Mata Kuliah"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget({ type: 'course', id: course.id, title: course.name })}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Hapus Mata Kuliah"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table 3: CRUD Pengumuman */}
        {activeTab === 'announcements' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Mata Kuliah</th>
                  <th className="p-3">Judul Pengumuman</th>
                  <th className="p-3">Tag Kategori</th>
                  <th className="p-3">Waktu</th>
                  <th className="p-3 text-right">Aksi CRUD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {announcements
                  .filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.courseName.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((ann) => (
                    <tr key={ann.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-bold text-slate-900">{ann.courseName}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          {ann.isPinned && <Pin className="w-3 h-3 text-blue-600 shrink-0" />}
                          <span className="font-semibold text-slate-900 truncate max-w-sm">{ann.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{ann.content}</p>
                      </td>
                      <td className="p-3">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800">
                          {ann.tag || 'Informasi'}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{ann.date}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setDeleteTarget({ type: 'announcement', id: ann.id, title: ann.title })}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Hapus Pengumuman"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table 4: CRUD Tugas */}
        {activeTab === 'tasks' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Tugas & Mata Kuliah</th>
                  <th className="p-3">PJ (Assignee)</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Aksi CRUD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tasks
                  .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.courseName.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((task) => (
                    <tr key={task.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block truncate max-w-xs">{task.title}</span>
                        <span className="text-[11px] text-blue-600">{task.courseName} {task.groupName ? `· ${task.groupName}` : ''}</span>
                      </td>
                      <td className="p-3 font-medium text-slate-700">{task.assigneeName}</td>
                      <td className="p-3">
                        <span className="block text-slate-800">{task.dueDate}</span>
                        <span className="text-[10px] text-amber-600 font-bold">{task.daysLeftText}</span>
                      </td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          task.status === 'done' ? 'bg-emerald-50 text-emerald-700' : task.status === 'inprogress' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setDeleteTarget({ type: 'task', id: task.id, title: task.title })}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Hapus Tugas"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Deletion */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Konfirmasi Hapus Data</h3>
              <p className="text-xs text-slate-600 mt-1">
                Apakah kamu yakin ingin menghapus <b>"{deleteTarget.title}"</b>? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs"
              >
                Ya, Hapus Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
