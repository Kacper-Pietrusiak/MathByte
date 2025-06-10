"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Trophy,
  Calendar,
  Clock,
  ArrowRight,
  GraduationCap,
  BookCheck
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data - replace with real data from your API
const stats = {
  coursesInProgress: 3,
  totalLessons: 24,
  completedLessons: 12,
  nextLesson: {
    id: "123",
    title: "Matematyka - Funkcje kwadratowe",
    time: "Today at 15:00",
    teacherName: "mgr Anna Kowalska",
    status: "waiting" // waiting | live | ended
  },
  streakDays: 7,
  xpPoints: 1250
}

const recentCourses = [
  {
    id: 1,
    title: "Matematyka - Poziom Podstawowy",
    progress: 65,
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    title: "Python dla początkujących",
    progress: 30,
    lastActivity: "Yesterday"
  },
  {
    id: 3,
    title: "Podstawy informatyki",
    progress: 45,
    lastActivity: "3 days ago"
  }
]

export default function DashboardPage() {
  const router = useRouter();

  const handleJoinLesson = () => {
    router.push(`/student/lessons/${stats.nextLesson.id}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-blue-700">Welcome back! 👋</h1>
        <p className="text-muted-foreground mt-2">
          Here&apos;s an overview of your learning progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-blue-700" />
            <div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
              <p className="text-2xl font-bold text-blue-700">{stats.coursesInProgress}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-blue-700" />
            <div>
              <p className="text-sm text-muted-foreground">XP Points</p>
              <p className="text-2xl font-bold text-blue-700">{stats.xpPoints}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-700" />
            <div>
              <p className="text-sm text-muted-foreground">Day Streak</p>
              <p className="text-2xl font-bold text-blue-700">{stats.streakDays} days</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <BookCheck className="h-4 w-4 text-blue-700" />
            <div>
              <p className="text-sm text-muted-foreground">Completed Lessons</p>
              <p className="text-2xl font-bold text-blue-700">{stats.completedLessons}/{stats.totalLessons}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Next Lesson Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-2 p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Next Lesson</h2>
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-700" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-700">{stats.nextLesson.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{stats.nextLesson.time}</p>
              <div className="flex items-center space-x-3 text-sm">
                <GraduationCap className="h-4 w-4 text-blue-700" />
                <span className="text-blue-700">{stats.nextLesson.teacherName}</span>
              </div>
            </div>
            <Button 
              onClick={handleJoinLesson}
              disabled={stats.nextLesson.status === "ended"}
              className="bg-blue-700 hover:bg-blue-800 text-white"
            >
              Join Lesson
            </Button>
          </div>
        </Card>

        {/* Quick Actions Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-between border-blue-200 hover:bg-blue-50"
              onClick={() => router.push('/student/courses')}
            >
              Browse Courses <ArrowRight className="h-4 w-4 text-blue-700" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between border-blue-200 hover:bg-blue-50"
              onClick={() => router.push('/student/schedule')}
            >
              Schedule Lesson <ArrowRight className="h-4 w-4 text-blue-700" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between border-blue-200 hover:bg-blue-50"
              onClick={() => router.push('/student/resources')}
            >
              View Resources <ArrowRight className="h-4 w-4 text-blue-700" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Courses */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-700">Recent Courses</h2>
          <Button 
            variant="link" 
            className="text-blue-700"
            onClick={() => router.push('/student/courses')}
          >
            View all courses
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentCourses.map((course) => (
            <Card 
              key={course.id} 
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/student/courses/${course.id}`)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-blue-700">{course.title}</h3>
                <span className="text-xs text-muted-foreground">{course.lastActivity}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-blue-700">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2 bg-blue-100" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}