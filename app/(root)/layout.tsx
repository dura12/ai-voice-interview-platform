// src/app/layout.tsx
import Link from 'next/link';
import React, { ReactNode } from 'react';
import Image from 'next/image';
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
import { signOut } from "@/lib/actions/auth.actions";
import { Button } from "@/components/ui/button";

async function checkAuthStatus(): Promise<boolean> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  return !!sessionCookie;
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await checkAuthStatus();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className='root-layout flex flex-col min-h-screen'>
      <nav className='flex items-center justify-between px-4 py-3 md:px-6 border-b bg-background sticky top-0 z-10'>
        <Link href='/' className='flex items-center gap-2'>
          <Image src='/logo.svg' alt='logo' width={32} height={32} />
          <h2 className='text-lg font-semibold text-primary-100'>CareerSpark</h2>
        </Link>

        <form action={signOut}>
          <Button type="submit" variant="outline" size="sm">
            Sign Out
          </Button>
        </form>
      </nav>

      <main className='flex-grow p-4 md:p-6'>
        {children}
      </main>

      <footer className='text-center p-4 border-t text-sm text-muted-foreground'>
        © {new Date().getFullYear()} CareerSpark. All rights reserved.
      </footer>
    </div>
  );
};

export default RootLayout;
