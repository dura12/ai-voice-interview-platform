import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import SignOutButton from "@/components/signoutbutton";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }

  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="CareerSpark Logo" width={38} height={32} />
          <h2 className="text-primary-100 sm:text-3xl text-xl">CareerSpark</h2>
        </Link>

        {/* ✅ Show Sign Out if user is authenticated */}
        <SignOutButton />
      </nav>

      <main className=" min-h-screen flex-1">{children}</main>

      {/* ✅ Footer */}
      <footer className="text-center p-4 border-t text-sm text-gray-500 mt-auto">
    © {new Date().getFullYear()} CareerSpark. All rights reserved.
  </footer>
    </div>
  );
};

export default Layout;
