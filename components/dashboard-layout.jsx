import { LogOut, User, UserCircle } from "lucide-react";
import React from "react";
import Navigation from "./navigation";
import NotificationPopover from "./notification-popover";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import Link from "next/link";
import WorkerProfileDialog from "./worker-profile-dialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DashboardLayout = ({ children, role }) => {
  const { data: user } = useQuery(["user"], async () => {
    const response = await axios.get("/api/auth/me");

    return response.data;
  });

  return (
    <div className="max-w-7xl m-auto">
      {/* Header */}
      <div className="flex justify-between py-6 mb-6">
        <h1 className="font-black text-emerald-500 tracking-tight text-xl uppercase">
          Buildustry
        </h1>
        <div className="flex gap-4 items-center">
          <NotificationPopover />

          <Popover>
            <PopoverTrigger>
              <UserCircle size={24} />
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col space-y-4">
                {role !== "client" && (
                  <WorkerProfileDialog worker={user}>
                    <Button
                      variant="ghost"
                      className="items-start justify-start flex gap-2"
                    >
                      <User size={24} />
                      Profile
                    </Button>
                  </WorkerProfileDialog>
                )}
                <Link
                  href="/"
                  className="items-start justify-start flex gap-2 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <LogOut size={24} />
                  Logout
                </Link>
              </div>
            </PopoverContent>
          </Popover>
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
