import { useState } from "react";
import {
  Users,
  FileText,
  BookOpen,
  Video,
  LayoutDashboard,
  CheckSquare,
  Shield,
  BarChart2,
  Home,
  Settings,
  LogOut,
  UserCog,
  PlusSquare,
} from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi";

const sections = [
  {
    title: "Data",
    items: [
      { label: "Users", icon: Users },
      { label: "Invoices", icon: FileText },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Create Course", icon: PlusSquare },
      { label: "Live Courses", icon: Video },
    ],
  },
  {
    title: "Customization",
    items: [
      { label: "Hero", icon: LayoutDashboard },
      { label: "FAQ", icon: CheckSquare },
      { label: "Categories", icon: Shield },
    ],
  },
  {
    title: "Controllers",
    items: [{ label: "Manage Team", icon: UserCog }],
  },
  {
    title: "Analytics",
    items: [{ label: "Courses Analytics", icon: BarChart2 }],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  return (
    <nav
      className={clsx(
        "bg-[#0a1435] text-white h-screen p-4 flex flex-col justify-between transition-all duration-300 shadow-lg overflow-y-auto",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-xl font-bold tracking-wide">EdVentura</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md text-white hover:bg-gray-700 flex justify-center items-center"
          >
            {collapsed ? (
              <span className="material-symbols-outlined">arrow_forward_ios</span>
            ) : (
              <span className="material-symbols-outlined">arrow_back_ios</span>
            )}
          </button>
        </div>

        <div className="flex flex-col items-center my-6">
          <div className='800px:flex items-center gap-2'>
            {user.avatar ? (

              <Image
                className="w-12 h-12 rounded-full"
                src={user.avatar.url}
                alt="User Avatar"
                width={28}  // Required
                height={28} // Required
              />

            ) : (
              <HiOutlineUserCircle
                size={22}
                className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors"
              />
            )}
          </div>
          {!collapsed && (
            <>
              <h3 className="mt-2 text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-400">- Admin</p>
            </>
          )}
        </div>

        <ul className="space-y-2">
          <li className="cursor-pointer flex items-center p-2 rounded-md hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105">
            <Home className="w-6 h-6" />
            {!collapsed && <span className="ml-3">Dashboard</span>}
          </li>

          {sections.map((section) => (
            <div key={section.title} className="cursor-pointer">
              {!collapsed && (
                <h4 className="text-xs uppercase text-gray-400 font-semibold my-4">
                  {section.title}
                </h4>
              )}
              {section.items.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center p-2 rounded-md transition-transform duration-300 transform hover:scale-105 hover:bg-blue-600"
                >
                  <item.icon className="w-6 h-6" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </li>
              ))}
            </div>
          ))}
        </ul>
      </div>

      {/* Footer - Settings & Logout */}
      <div className="mt-10">
        <li className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-transform duration-300 transform hover:scale-105">
          <Settings className="w-6 h-6" />
          {!collapsed && <span className="ml-3">Settings</span>}
        </li>
        <li className="flex items-center p-2 rounded-md hover:bg-red-600 transition-transform duration-300 transform hover:scale-105">
          <LogOut className="w-6 h-6" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </li>
      </div>
    </nav>
  );
}
