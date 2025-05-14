import React, { ReactNode } from 'react'
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.actions";

const AuthLayout = async ({children}:{children : ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated) redirect("/");
  
  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      {children}
    </div>
  );
}

export default AuthLayout