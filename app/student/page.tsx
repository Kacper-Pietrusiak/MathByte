"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  Rocket, 
  Trophy,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

// Mock data - replace with actual data from your backend
const studentData = {
  name: "Ania",
  overallProgress: 30,
  currentCourse: {
    name: "Math Master - Grade 4",
    progress: 25,
    lessonsCompleted: 5,
    totalLessons: 20
  },
  courses: [
    {
      id: 1,
      title: "Multiplication Basics - Level 2",
      status: "In Progress",
      thumbnail: "/course-thumb-1.jpg"
    },
    {
      id: 2,
      title: "Fractions Fundamentals",
      status: "Not Started",
      thumbnail: "/course-thumb-2.jpg"
    }
  ],
  upcomingLessons: [
    {
      id: 1,
      date: "2024-03-20T15:00:00",
      teacher: "Ms. Johnson",
      isOnline: true
    }
  ],
  assignments: [
    {
      id: 1,
      title: "Multiplication Quiz",
      course: "Multiplication Basics",
      status: "To Do"
    }
  ],
  messages: [
    {
      id: 1,
      type: "new_course",
      content: "You've been enrolled in Fractions Fundamentals!"
    }
  ]
};

export default function StudentDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with back button and user profile */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Button asChild variant="ghost" className="flex items-center gap-2">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="flex-grow container mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 text-white"
        >
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarImage src="/student-avatar.jpg" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Hi, {studentData.name}!</h1>
              <p className="text-lg">Ready to learn something new today?</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span>Overall Progress</span>
              <span>{studentData.overallProgress}%</span>
            </div>
            <Progress value={studentData.overallProgress} className="h-2" />
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="progress" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">{studentData.currentCourse.name}</h3>
                    <div className="flex justify-between mb-2">
                      <span>Progress</span>
                      <span>{studentData.currentCourse.progress}%</span>
                    </div>
                    <Progress value={studentData.currentCourse.progress} className="h-2" />
                    <p className="text-sm text-gray-500 mt-2">
                      Lessons completed: {studentData.currentCourse.lessonsCompleted} / {studentData.currentCourse.totalLessons}
                    </p>
                  </div>
                  <Button className="w-full">Continue Course</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentData.courses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4" />
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{course.status}</p>
                    <Button variant="outline" className="w-full">
                      {course.status === "Not Started" ? "Start Course" : "Continue"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Upcoming Lessons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentData.upcomingLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{new Date(lesson.date).toLocaleString()}</p>
                        <p className="text-sm text-gray-500">with {lesson.teacher}</p>
                      </div>
                      <Button variant={lesson.isOnline ? "default" : "outline"}>
                        {lesson.isOnline ? "Join Now" : "View Details"}
                      </Button>
                    </div>
                  ))}
                  <Button className="w-full">Book a New Lesson</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Assignments & Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentData.assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{assignment.title}</p>
                        <p className="text-sm text-gray-500">{assignment.course}</p>
                      </div>
                      <Button variant="outline">Start</Button>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full">See Results History</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            Buy a 1:1 Lesson
          </Button>
          <Button className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Join a New Course
          </Button>
          <Button className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Message Your Teacher
          </Button>
        </div>

        {/* Messages & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Messages & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentData.messages.map((message) => (
                <div key={message.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  <p>{message.content}</p>
                </div>
              ))}
              <Button variant="ghost" className="w-full">View All Messages</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
