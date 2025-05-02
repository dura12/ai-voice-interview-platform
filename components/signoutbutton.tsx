"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "@/lib/actions/auth.actions";

const SignOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/sign-in");
      toast.success('Signed out Successfully')
    } catch {
      toast.error("An error occurred during sign out.");
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-white border border-gray-100 cursor-pointer hover:underline px-3"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
