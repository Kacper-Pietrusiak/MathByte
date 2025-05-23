import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center pt-20">
      <SignIn path="/sign-in" routing="path" />
    </div>
  );
}
