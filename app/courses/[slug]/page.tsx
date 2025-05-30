// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";
// import { notFound } from "next/navigation";

// interface Params {
//   params: {
//     slug: string;
//   };
// }

// interface Tag {
//   id: number;
//   name: string;
// }

// interface Module {
//   id: number;
//   title: string;
//   order: number;
// }

// export default async function CourseDetailPage({ params }: Params) {
//   const res = await fetch(`http://192.168.0.181:1337/courses?slug=${params.slug}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     notFound();
//   }

//   const data = await res.json();
//   const course = data[0];

//   if (!course) {
//     notFound();
//   }

//   const {
//     title,
//     fullDescription,
//     image,
//     tags,
//     level,
//     duration,
//     modules,
//   } = course;

//   const imageUrl = image?.[0]?.url;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 pt-24">
//       {imageUrl && (
//         <div className="relative w-full h-80 rounded-xl overflow-hidden">
//           <Image
//             src={`http://192.168.0.181:1337${imageUrl}`}
//             alt={title}
//             fill
//             className="object-cover"
//           />
//         </div>
//       )}

//       <div className="space-y-4">
//         <h1 className="text-3xl font-bold leading-tight">{title}</h1>
//         <div className="text-muted-foreground text-sm">
//           {level} • {duration}
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {tags?.map((tag: Tag) => (
//             <Badge key={tag.id}>{tag.name}</Badge>
//           ))}
//         </div>
//         <div
//           className="prose max-w-none"
//           dangerouslySetInnerHTML={{ __html: fullDescription }}
//         />
//       </div>

//       {modules?.length > 0 && (
//         <div className="space-y-4">
//           <h2 className="text-2xl font-semibold pt-6">Moduły kursu</h2>
//           {modules
//             .sort((a: Module, b: Module) => a.order - b.order)
//             .map((mod: Module) => (
//               <Card key={mod.id}>
//                 <CardContent className="p-4">
//                   <div className="font-medium">{mod.title}</div>
//                 </CardContent>
//               </Card>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// }