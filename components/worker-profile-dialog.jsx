import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import ProjectRequestDialog from "./project-request-dialog";
import WorkerPortfolio from "./worker-portfolio";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "./ui/button";
import { Send, Star } from "lucide-react";
import Link from "next/link";

const WorkerProfileDialog = ({
  children,
  worker,
  onDropdown,
  dropdownMenu,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {onDropdown && dropdownMenu}

      {!onDropdown && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Worker Profile</DialogTitle>
        </DialogHeader>
        <WorkerProfileContent worker={worker} />
      </DialogContent>
    </Dialog>
  );
};

export const WorkerProfileContent = ({ worker }) => {
  const { data: user } = useQuery(["user"], async () => {
    const response = await axios.get("/api/auth/me");

    return response.data;
  });

  const { data: portfolio, isLoading } = useQuery(
    ["portfolio", worker.id],
    async () => {
      return (await axios.get(`/api/users/${worker.id}/portfolio`)).data;
    }
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4">
          <div className="w-40 aspect-square relative">
            <Image
              src="https://picsum.photos/seed/face/500/500"
              alt=""
              fill
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-bold text-emerald-500">{`${worker.firstName} ${worker.lastName}`}</p>
            <div>
              <p className="text-slate-500">{worker.email}</p>
              <p className="text-slate-500">{worker.contactNumber}</p>
            </div>
            <div className="flex gap-1 items-center">
              <Star size={24} className="fill-yellow-500 text-transparent" />
              <p className="font-semibold text-sm">
                {(worker.rating / worker.ratingCount).toFixed(1)}
              </p>
              <p className="text-xs text-slate-500">{`(${worker.ratingCount} Reviews)`}</p>
            </div>
            <div className="flex gap-2">
              <ProjectRequestDialog role={worker.role} worker={worker}>
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  Request Service
                </Button>
              </ProjectRequestDialog>
              <Link
                href={`/dashboard/messages/${worker.id}`}
                variant="outline"
                className="flex items-center text-sm gap-2 h-9 px-4 py-2 border border-input bg-background shadow-sm rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                <Send strokeWidth={1} size={16} className="mt-1" />
                <span>Message</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <DialogTitle>Projects Done</DialogTitle>
      {!isLoading && (
        <WorkerPortfolio
          portfolio={portfolio}
          userIsWorker={user?.id === worker.id}
        />
      )}
    </div>
  );
};

export default WorkerProfileDialog;
