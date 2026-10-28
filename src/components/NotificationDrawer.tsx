import React from 'react';
import { X, Bell, Calendar, AlertTriangle, Users, FileText, CheckCircle2 } from 'lucide-react';
import { ViewMode } from '../types';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'urgent' | 'assignment' | 'room' | 'group';
  time: string;
  isRead: boolean;
  targetView: ViewMode;
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Jadwal UTS Resmi Dirilis',
      message: 'Jadwal Ujian Tengah Semester mata kuliah Digital Business telah diunggah di Class Space.',
      category: 'urgent',
      time: '15 menit lalu',
      isRead: false,
      targetView: 'class-space',
    },
    {
      id: 'notif-2',
      title: 'Tenggat Tugas Mendekat',
      message: 'Tugas "Desain UI (High-Fidelity)" tersisa 2 hari lagi sebelum deadline sprint.',
      category: 'assignment',
      time: '1 jam lalu',
      isRead: false,
      targetView: 'group-workspace',
    },
    {
      id: 'notif-3',
      title: 'Perubahan Ruang Kuliah',
      message: 'Praktikum UI/UX Design dialihkan ke Smart Classroom Gedung B Lantai 3.',
      category: 'room',
      time: '3 jam lalu',
      isRead: true,
      targetView: 'class-space',
    },
    {
      id: 'notif-4',
      title: 'Salsabila A. Memperbarui Tugas',
      message: 'Menyelesaikan checklist "Desain high fidelity & color palette" pada proyek e-commerce.',
      category: 'group',
      time: 'Kemarin',
      isRead: true,
      targetView: 'group-workspace',
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const getCategoryBadge = (category: NotificationItem['category']) => {
    switch (category) {
      case 'urgent':
        return { icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />, bg: 'bg-rose-50 text-rose-700' };
      case 'assignment':
        return { icon: <Calendar className="w-3.5 h-3.5 text-amber-600" />, bg: 'bg-amber-50 text-amber-700' };
      case 'room':
        return { icon: <FileText className="w-3.5 h-3.5 text-blue-600" />, bg: 'bg-blue-50 text-blue-700' };
      default:
        return { icon: <Users className="w-3.5 h-3.5 text-emerald-600" />, bg: 'bg-emerald-50 text-emerald-700' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Notifikasi Terstruktur</h3>
              <p className="text-[11px] text-slate-500">Bebas tertimbun obrolan grup WhatsApp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick action: mark all read */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-500">
            {notifications.filter((n) => !n.isRead).length} belum dibaca
          </span>
          <button
            onClick={markAllAsRead}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Tandai semua terbaca
          </button>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {notifications.map((item) => {
            const badge = getCategoryBadge(item.category);
            return (
              <div
                key={item.id}
                onClick={() => {
                  onNavigate(item.targetView);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  item.isRead
                    ? 'bg-white border-slate-200 hover:bg-slate-50'
                    : 'bg-blue-50/40 border-blue-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {badge.icon}
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  {item.message}
                </p>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100/80">
                  <span className="text-blue-600 font-medium">Buka detail &rarr;</span>
                  {!item.isRead && (
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          Notifikasi tersinkronisasi otomatis dengan dosen dan kelompok
        </div>
      </div>
    </div>
  );
};
