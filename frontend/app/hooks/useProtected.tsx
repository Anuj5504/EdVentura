"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import userAuth from "./userAuth";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const router = useRouter();
  const isAuthenticated = userAuth(); // Use it as a hook
  
  useEffect(() => {
    if (!isAuthenticated) { 
      redirect("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) return null;

  return isAuthenticated ? children : null;
}
