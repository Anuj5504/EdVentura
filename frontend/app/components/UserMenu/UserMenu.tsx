"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BookOpen, Settings, LogOut, User, Crown, Bell } from "lucide-react";
import Link from "next/link";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
type UserMenuProps = {};

const UserMenu: React.FC<UserMenuProps> = () => {
  const [logout, setlogout] = useState(false);
  const { user } = useSelector((state: any) => state.auth);

  const { } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const handleLogOut = async () => {

    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    await signOut();
    
    setlogout(true);
    toast.success("Logged Out")
};

  return (

    <div className="absolute top-[10px] right-28 max-w-xs w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
      {/* User Profile Section */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              className="w-12 h-12 rounded-full border-2 border-blue-500"
              src="/images/profile.png"
              alt="User Avatar"
              width={48}
              height={48}
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {user?.name}
            </h2>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-1 p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">12</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Courses</div>
        </div>
        <div className="text-center border-x border-gray-200 dark:border-gray-800">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">85%</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Progress</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">4</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Certificates</div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="p-3 space-y-1">
        <Link href="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <User className="w-5 h-5 text-blue-500" />
          <span className="text-gray-700 dark:text-gray-300">Profile</span>
        </Link>

        <Link href="/courses" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <BookOpen className="w-5 h-5 text-violet-500" />
          <span className="text-gray-700 dark:text-gray-300">My Courses</span>
        </Link>

        <Link href="/notifications" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Bell className="w-5 h-5 text-orange-500" />
          <span className="text-gray-700 dark:text-gray-300">Notifications</span>
          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
        </Link>

        <Link href="/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Settings className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700 dark:text-gray-300">Settings</span>
        </Link>

        <button onClick={() => handleLogOut()} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
