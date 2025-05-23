"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { 
  ArrowLeft,
  Users,
  BookOpen,
  Calendar,
  CreditCard,
  Plus,
  Search,
  Edit,
  Copy,
  Eye,
  Video
} from "lucide-react";
import { motion } from "framer-motion";

// Mock data - replace with actual data from your backend
const adminData = {
  name: "Kacper",
  stats: {
    totalStudents: 156,
    activeCourses: 8,
    upcomingLessons: 12,
    monthlyRevenue: 2500
  },
  recentPayment: {
    student: "Mateusz",
    type: "1:1 lesson",
    amount: "50 zł"
  },
  upcomingLessons: [
    {
      id: 1,
      date: "2024-03-20T15:00:00",
      student: "Anna Kowalska",
      status: "Paid"
    },
    {
      id: 2,
      date: "2024-03-21T16:00:00",
      student: "Jan Nowak",
      status: "Pending"
    }
  ],
  courses: [
    {
      id: 1,
      title: "Math Basics - Grade 4",
      enrolledStudents: 45,
      status: "Published"
    },
    {
      id: 2,
      title: "Advanced Algebra",
      enrolledStudents: 28,
      status: "Draft"
    }
  ],
  students: [
    {
      id: 1,
      name: "Anna Kowalska",
      email: "anna@example.com",
      role: "student",
      status: "active"
    },
    {
      id: 2,
      name: "Jan Nowak",
      email: "jan@example.com",
      role: "student",
      status: "active"
    }
  ],
  assignments: [
    {
      id: 1,
      title: "Multiplication Quiz",
      course: "Math Basics",
      status: "Open",
      submissions: 35
    }
  ],
  messages: [
    {
      id: 1,
      student: "Anna Kowalska",
      lastMessage: "When is the next lesson?",
      timestamp: "2024-03-19T14:30:00"
    }
  ],
  availability: {
    monday: "14:00-17:00",
    wednesday: "15:00-18:00",
    friday: "13:00-16:00"
  },
  payments: [
    {
      id: 1,
      student: "Mateusz",
      amount: "50 zł",
      item: "1:1 lesson",
      date: "2024-03-19",
      status: "Paid"
    }
  ]
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
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
        {/* Welcome Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 text-white"
        >
          <h1 className="text-2xl font-bold mb-4">Welcome back, {adminData.name}!</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">📚 Active Courses</h3>
              <p className="text-2xl">{adminData.stats.activeCourses}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">👨‍🎓 Total Students</h3>
              <p className="text-2xl">{adminData.stats.totalStudents}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">💰 Recent Payment</h3>
              <p>{adminData.recentPayment.student} purchased a {adminData.recentPayment.type} – {adminData.recentPayment.amount}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminData.stats.totalStudents}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminData.stats.activeCourses}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Lessons</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminData.stats.upcomingLessons}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminData.stats.monthlyRevenue} zł</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Course Management</CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Course
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-500">
                          {course.enrolledStudents} students • {course.status}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </Button>
                        <Button variant="outline" size="sm">
                          Unpublish
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <div className="flex items-center gap-2 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      className="pl-8 w-full rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{student.name}</h3>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{student.role}</span>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming 1:1 Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.upcomingLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{new Date(lesson.date).toLocaleString()}</p>
                        <p className="text-sm text-gray-500">with {lesson.student}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          lesson.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {lesson.status}
                        </span>
                        <Button variant={lesson.status === 'Paid' ? 'default' : 'outline'}>
                          {lesson.status === 'Paid' ? (
                            <>
                              <Video className="w-4 h-4 mr-2" />
                              Join
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.messages.map((message) => (
                    <div key={message.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <Avatar>
                        <AvatarFallback>{message.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{message.student}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(message.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{message.lastMessage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Availability Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(adminData.availability).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold capitalize">{day}</h3>
                        <p className="text-sm text-gray-500">{hours}</p>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{payment.student}</h3>
                        <p className="text-sm text-gray-500">
                          {payment.item} • {payment.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">{payment.amount}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 