"use client";
import { useRouter } from "next/navigation";
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
      toast.error("You are not logged in.");
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) return null;

  return isAuthenticated ? children : null;
}
