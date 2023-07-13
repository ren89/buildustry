import { UserCircle } from "lucide-react";
import React from "react";
import Navigation from "./navigation";
import NotificationPopover from "./notification-popover";

const DashboardLayout = ({ children, role }) => {
  return (
    <div className="max-w-7xl m-auto">
      {/* Header */}
      <div className="flex justify-between py-6 mb-6">
        <h1 className="font-black text-emerald-500 tracking-tight text-xl uppercase">
          Buildustry
        </h1>
        <div className="flex gap-4 items-center">
          <NotificationPopover />
          <UserCircle size={24} />
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-2 border-r border-slate-200 min-h-[80vh]">
          <Navigation role={role} />
        </div>
        <div className="col-span-10 grid grid-cols-8 auto-rows-min gap-6">
          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
