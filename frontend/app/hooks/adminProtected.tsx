"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import userAuth from "./userAuth";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  if (user) {
    const isAdmin = user?.role === "admin";
    useEffect(() => {
      if (!isAdmin) {
        redirect("/");
      }
    }, [isAdmin, router]);

    if (isAdmin === null) return null;

    return isAdmin ? children : null;
  }

}
