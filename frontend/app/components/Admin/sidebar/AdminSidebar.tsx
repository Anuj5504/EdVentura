import { useState } from "react";
import { Home, LayoutDashboard, CheckSquare, Shield, Bell, User, CreditCard } from "lucide-react";
import "tailwindcss/tailwind.css";
import clsx from "clsx";

interface SidebarItem {
  label: string;
  icon: React.ComponentType;
  active?: boolean;
}

const menuItems: SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Tasks", icon: CheckSquare },
  { label: "Users", icon: User },
  { label: "Security", icon: Shield },
  { label: "Cash", icon: CreditCard },
  { label: "Notifications", icon: Bell },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <nav
        className={clsx(
          "bg-black text-white h-screen p-4 flex flex-col justify-between transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold">{!collapsed && "Ottertag"}</span>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-white focus:outline-none"
            >
              {collapsed ? ">" : "<"}
            </button>
          </div>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.label} className={clsx(
                "flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-purple-600",
                item.active ? "bg-purple-600" : ""
              )}>
                <item.icon className="w-5 h-5" />
                {!collapsed && <span>{item.label}</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-2 mt-auto">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Avatar"
            className="w-10 h-10 rounded-full"
          />
          {!collapsed && (
            <div>
              <p className="text-sm">Culaccino_</p>
              <p className="text-xs text-gray-400">UX Designer</p>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
