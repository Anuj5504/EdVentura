import React, { useState } from "react";
import { Bell } from "lucide-react";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";

const DashboardHeader: React.FC = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications] = useState([
        "New user signed up",
        "Order #1234 has been placed",
        "Server maintenance scheduled",
    ]);

    return (
        <div className="flex justify-between items-center p-4 w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow ">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="flex gap-4">
                <ThemeSwitcher />
                <div className="relative">
                    <button onClick={() => setShowNotifications(!showNotifications)} className="relative">
                        <Bell className="w-6 h-6" />
                        {notifications.length > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full px-2">
                                {notifications.length}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-72 bg-white shadow-md rounded-lg p-3 text-black">
                            <h2 className="font-semibold mb-2">Notifications</h2>
                            {notifications.length > 0 ? (
                                <ul className="space-y-2">
                                    {notifications.map((notification, index) => (
                                        <li key={index} className="p-2 border-b last:border-none">
                                            {notification}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">No new notifications</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
