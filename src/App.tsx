import React, { useState, useEffect } from 'react';
import { 
  CURRENT_USER, 
  INITIAL_COURSES, 
  INITIAL_GROUPS, 
  INITIAL_TASKS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_MATERIALS 
} from './data/initialData';
import { ViewMode, Task, Announcement, Course, GroupProject, Material } from './types';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { ClassSpaceView } from './components/ClassSpaceView';
import { GroupWorkspaceView } from './components/GroupWorkspaceView';
import { PersonalDashboardView } from './components/PersonalDashboardView';
import { MaterialsHubView } from './components/MaterialsHubView';
import { AdminPanelView } from './components/AdminPanelView';
import { LandingView } from './components/LandingView';
import { TaskDetailModal } from './components/TaskDetailModal';
import { NewTaskModal } from './components/NewTaskModal';
import { NewAnnouncementModal } from './components/NewAnnouncementModal';
import { MaterialModal } from './components/MaterialModal';
import { CourseModal } from './components/CourseModal';
import { ProblemSolutionModal } from './components/ProblemSolutionModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { LoginModal } from './components/LoginModal';
import { Smartphone, Wifi, Battery, Signal } from 'lucide-react';

const STORAGE_KEYS = {
  COURSES: 'aclass_courses_v1',
  MATERIALS: 'aclass_materials_v1',
  ANNOUNCEMENTS: 'aclass_announcements_v1',
  TASKS: 'aclass_tasks_v1',
  ADMIN_AUTH: 'aclass_admin_session_active',
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [user, setUser] = useState(CURRENT_USER);

  // Separate Admin Authentication State (Safeguarded from student access)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Persistent State via localStorage with initial fallback
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      return saved ? JSON.parse(saved) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [groups, setGroups] = useState<GroupProject[]>(INITIAL_GROUPS);

  const [materials, setMaterials] = useState<Material[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MATERIALS);
      return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
    } catch {
      return INITIAL_MATERIALS;
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch (e) {
      console.error(e);
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials));
    } catch (e) {
      console.error(e);
    }
  }, [materials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch (e) {
      console.error(e);
    }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, String(isAdminAuthenticated));
    } catch (e) {
      console.error(e);
    }
  }, [isAdminAuthenticated]);

  // Modals & Drawers state
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isNewAnnouncementOpen, setIsNewAnnouncementOpen] = useState(false);
  const [selectedCourseForAnnounce, setSelectedCourseForAnnounce] = useState<string>('');
  const [isProblemSolutionOpen, setIsProblemSolutionOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Material Modal (Add & Edit)
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [materialToEdit, setMaterialToEdit] = useState<Material | null>(null);

  // Course Modal (Add & Edit)
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  // Mobile device frame view toggle
  const [isMobileDeviceFrame, setIsMobileDeviceFrame] = useState(false);

  // Admin Auth Handlers
  const handleLoginAdmin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleLogoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setCurrentView('dashboard');
  };

  const handleBackToStudent = () => {
    setCurrentView('dashboard');
  };

  // Task Handlers (CRUD)
  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    if (selectedTask?.id === updatedTask.id) {
      setSelectedTask(updatedTask);
    }
  };

  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (selectedTask?.id === id) {
      setSelectedTask(null);
    }
  };

  // Announcement Handlers (CRUD)
  const handleAddAnnouncement = (newAnnouncement: Announcement) => {
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const handleOpenNewAnnouncement = (courseId?: string) => {
    setSelectedCourseForAnnounce(courseId || courses[0]?.id || '');
    setIsNewAnnouncementOpen(true);
  };

  // Material Handlers (CRUD)
  const handleOpenAddMaterial = () => {
    setMaterialToEdit(null);
    setIsMaterialModalOpen(true);
  };

  const handleOpenEditMaterial = (mat: Material) => {
    setMaterialToEdit(mat);
    setIsMaterialModalOpen(true);
  };

  const handleSaveMaterial = (mat: Material) => {
    setMaterials((prev) => {
      const exists = prev.some((m) => m.id === mat.id);
      if (exists) {
        return prev.map((m) => (m.id === mat.id ? mat : m));
      }
      return [mat, ...prev];
    });
  };

  const handleDeleteMaterial = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  const handleToggleBookmark = (id: string) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isBookmarked: !m.isBookmarked } : m))
    );
  };

  // Course Handlers (CRUD)
  const handleOpenAddCourse = () => {
    setCourseToEdit(null);
    setIsCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course: Course) => {
    setCourseToEdit(course);
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = (course: Course) => {
    setCourses((prev) => {
      const exists = prev.some((c) => c.id === course.id);
      if (exists) {
        return prev.map((c) => (c.id === course.id ? course : c));
      }
      return [...prev, course];
    });
  };

  const handleDeleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // Reset to initial demo dataset
  const handleResetData = () => {
    if (window.confirm('Reset seluruh data ke format awal tugas perkuliahan?')) {
      localStorage.removeItem(STORAGE_KEYS.COURSES);
      localStorage.removeItem(STORAGE_KEYS.MATERIALS);
      localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
      localStorage.removeItem(STORAGE_KEYS.TASKS);
      setCourses(INITIAL_COURSES);
      setMaterials(INITIAL_MATERIALS);
      setAnnouncements(INITIAL_ANNOUNCEMENTS);
      setTasks(INITIAL_TASKS);
    }
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingView
            onStartApp={() => setCurrentView('dashboard')}
            onOpenProblemSolution={() => setIsProblemSolutionOpen(true)}
            onNavigateToView={(view) => setCurrentView(view)}
          />
        );
      case 'materials-hub':
        return (
          <MaterialsHubView
            courses={courses}
            materials={materials}
            onToggleBookmark={handleToggleBookmark}
            onOpenAddMaterial={handleOpenAddMaterial}
            onNavigateToCourse={() => setCurrentView('class-space')}
          />
        );
      case 'admin-panel':
        return (
          <AdminPanelView
            courses={courses}
            materials={materials}
            announcements={announcements}
            tasks={tasks}
            isAdminAuthenticated={isAdminAuthenticated}
            onLoginAdmin={handleLoginAdmin}
            onLogoutAdmin={handleLogoutAdmin}
            onBackToStudent={handleBackToStudent}
            onOpenAddMaterial={handleOpenAddMaterial}
            onEditMaterial={handleOpenEditMaterial}
            onDeleteMaterial={handleDeleteMaterial}
            onOpenAddCourse={handleOpenAddCourse}
            onEditCourse={handleOpenEditCourse}
            onDeleteCourse={handleDeleteCourse}
            onOpenAddAnnouncement={() => setIsNewAnnouncementOpen(true)}
            onDeleteAnnouncement={handleDeleteAnnouncement}
            onOpenAddTask={() => setIsNewTaskOpen(true)}
            onDeleteTask={handleDeleteTask}
            onResetData={handleResetData}
          />
        );
      case 'class-space':
        return (
          <ClassSpaceView
            courses={courses}
            announcements={announcements}
            materials={materials}
            tasks={tasks}
            onOpenNewAnnouncement={handleOpenNewAnnouncement}
            onSelectTask={(task) => setSelectedTask(task)}
          />
        );
      case 'group-workspace':
        return (
          <GroupWorkspaceView
            groups={groups}
            tasks={tasks}
            onSelectTask={(task) => setSelectedTask(task)}
            onOpenNewTask={() => setIsNewTaskOpen(true)}
            onUpdateTask={handleUpdateTask}
          />
        );
      case 'personal-dashboard':
        return (
          <PersonalDashboardView
            tasks={tasks}
            onSelectTask={(task) => setSelectedTask(task)}
            onOpenNewTask={() => setIsNewTaskOpen(true)}
            onUpdateTask={handleUpdateTask}
          />
        );
      case 'dashboard':
      default:
        return (
          <DashboardView
            userName={user.name}
            courses={courses}
            groups={groups}
            tasks={tasks}
            announcements={announcements}
            onSelectTask={(task) => setSelectedTask(task)}
            onNavigate={(view) => setCurrentView(view)}
            onOpenNewTask={() => setIsNewTaskOpen(true)}
            onOpenProblemSolution={() => setIsProblemSolutionOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#182230] flex flex-col font-sans">
      {/* Top Main Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProblemSolution={() => setIsProblemSolutionOpen(true)}
        isAdminAuthenticated={isAdminAuthenticated}
        isMobileDeviceFrame={isMobileDeviceFrame}
        onToggleDeviceFrame={() => setIsMobileDeviceFrame(!isMobileDeviceFrame)}
      />

      {/* Main Content Area: Responsive or Phone Frame Simulator */}
      {isMobileDeviceFrame ? (
        <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 bg-slate-900/10">
          <div className="text-center mb-3 text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-blue-600" />
            <span>Mode Simulasi Mobile Smartphone (iPhone/Android Touch Preview)</span>
          </div>

          {/* Smartphone Bezel & Screen Wrapper */}
          <div className="w-[390px] h-[810px] max-w-full bg-slate-950 rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800 relative flex flex-col overflow-hidden">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 mr-2" />
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>

            {/* Simulated Phone Screen Container */}
            <div className="w-full h-full bg-[#F5F7FC] rounded-[38px] overflow-hidden flex flex-col relative">
              {/* Phone Status Bar */}
              <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-800 bg-white/80 backdrop-blur-xs select-none z-40 shrink-0">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* Scrollable View Content */}
              <div className="flex-1 overflow-y-auto p-4 pb-20">
                {renderActiveView()}
              </div>

              {/* Mobile Bottom Navigation inside Phone Frame */}
              <BottomNav
                currentView={currentView}
                onNavigate={(view) => setCurrentView(view)}
                onOpenProblemSolution={() => setIsProblemSolutionOpen(true)}
                isAdminAuthenticated={isAdminAuthenticated}
              />

              {/* Home indicator bar */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-300 rounded-full z-50 pointer-events-none" />
            </div>
          </div>
        </div>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-5">
          {renderActiveView()}
        </main>
      )}

      {/* Floating Bottom Nav for actual mobile screens when not in simulated frame */}
      {!isMobileDeviceFrame && (
        <BottomNav
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          onOpenProblemSolution={() => setIsProblemSolutionOpen(true)}
          isAdminAuthenticated={isAdminAuthenticated}
        />
      )}

      {/* Modals and Drawers */}
      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdateTask={handleUpdateTask}
      />

      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onAddTask={handleAddTask}
        courses={courses}
        groups={groups}
      />

      <NewAnnouncementModal
        isOpen={isNewAnnouncementOpen}
        onClose={() => setIsNewAnnouncementOpen(false)}
        onAddAnnouncement={handleAddAnnouncement}
        courses={courses}
        defaultCourseId={selectedCourseForAnnounce}
      />

      {/* Material CRUD Modal */}
      <MaterialModal
        isOpen={isMaterialModalOpen}
        onClose={() => setIsMaterialModalOpen(false)}
        onSave={handleSaveMaterial}
        courses={courses}
        initialData={materialToEdit}
      />

      {/* Course CRUD Modal */}
      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onSave={handleSaveCourse}
        initialData={courseToEdit}
      />

      <ProblemSolutionModal
        isOpen={isProblemSolutionOpen}
        onClose={() => setIsProblemSolutionOpen(false)}
        onNavigateToView={(view) => setCurrentView(view)}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={(view) => setCurrentView(view)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(usr) => setUser(usr)}
      />
    </div>
  );
}
