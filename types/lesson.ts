// /types/lesson.ts

export interface Lesson {
    id: number;
    documentId: string;
    title: string;
    date: string;
    duration: number;
    description: string | null;
    studentId: string;
    isOnline: boolean;
    meetingUrl: string;
    isCancelled?: boolean;
  }
  