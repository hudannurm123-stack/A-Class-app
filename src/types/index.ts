export type Priority = 'Urgent' | 'High' | 'Medium' | 'Normal';
export type TaskStatus = 'todo' | 'inprogress' | 'done';

export interface User {
  id: string;
  name: string;
  nim: string;
  role: string;
  avatar: string;
  email: string;
  major: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  classGroup: string;
  lecturer: string;
  dayTime: string;
  room: string;
  semester: string;
  announcementsCount: number;
  tasksCount: number;
  color: string;
  isArchived?: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface Announcement {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  date: string;
  isPinned?: boolean;
  isNew?: boolean;
  tag?: string;
  attachments?: Attachment[];
}

export type MaterialCategory = 'all' | 'slide' | 'pdf' | 'video' | 'link' | 'exercise';

export interface Material {
  id: string;
  courseId: string;
  courseName?: string;
  meetingNumber: number;
  title: string;
  description: string;
  category: 'slide' | 'pdf' | 'video' | 'link' | 'exercise';
  uploadDate: string;
  externalUrl?: string;
  tags?: string[];
  isBookmarked?: boolean;
  author?: string;
  files: Attachment[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskComment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  groupId?: string;
  groupName?: string;
  assigneeName: string;
  assigneeAvatar?: string;
  dueDate: string; // YYYY-MM-DD
  daysLeftText: string;
  status: TaskStatus;
  priority: Priority;
  progressPercent: number;
  isPersonal: boolean;
  checklist: ChecklistItem[];
  attachments: Attachment[];
  comments: TaskComment[];
  storyPoints?: number;
}

export interface GroupProject {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  description: string;
  progress: number;
  members: {
    name: string;
    role: string;
    avatar: string;
    isLeader?: boolean;
  }[];
}

export type ViewMode = 'dashboard' | 'class-space' | 'group-workspace' | 'personal-dashboard' | 'materials-hub' | 'admin-panel' | 'landing';
