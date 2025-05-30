// import { Course } from "@/types/course";
// import CourseCard from "@/components/course-card";

// export default async function CoursesPage() {
//   const res = await fetch("http://192.168.0.181:1337/courses", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Nie udało się pobrać kursów.");
//   }

//   const courses = (await res.json()) as Course[];

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {courses.map((course) => {
//         const imageUrl =
//           course.image?.[0]?.formats?.medium?.url || course.image?.[0]?.url;

//         return (
//           <CourseCard key={course.id} course={course} imageUrl={imageUrl} />
//         );
//       })}
//     </div>
//   );
// }
