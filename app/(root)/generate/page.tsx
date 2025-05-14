import { redirect } from "next/navigation";
import InterviewConfigForm from "@/components/inputprompt";
import { getCurrentUser } from "@/lib/actions/auth.actions";

export default async function GeneratePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4">
        <InterviewConfigForm 
          username={user.name || ''} 
          id={user.id || ''} 
        />
      </div>
    </main>
  );
}