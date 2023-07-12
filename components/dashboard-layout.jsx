import { Bell, UserCircle } from "lucide-react";
import React from "react";
import Navigation from "./navigation";

const DashboardLayout = ({ children }) => {
  return (
    <div className="max-w-7xl m-auto">
      {/* Header */}
      <div className="flex justify-between py-6 mb-6">
        <h1 className="font-black text-emerald-500 tracking-tight text-xl uppercase">
          Buildustry
        </h1>
        <div className="flex gap-4">
          <Bell size={24} />
          <UserCircle size={24} />
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <Navigation />
        </div>
        <div className="col-span-10">
          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
