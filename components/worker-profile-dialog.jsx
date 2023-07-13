import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import Image from "next/image";
import Rating from "./rating";
import { Separator } from "./ui/separator";
import ProjectRequestDialog from "./project-request-dialog";
import WorkerPortfolio from "./worker-portfolio";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const WorkerProfileContent = ({ worker }) => {
  const { data: portfolio, isLoading } = useQuery(
    ["portfolio", worker.id],
    async () => {
      return (await axios.get(`/api/users/${worker.id}/portfolio`)).data;
    }
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 justify-between">
        <div className="flex gap-4">
          <div className="w-24 h-24 relative">
            <Image
              src="https://picsum.photos/500/500"
              alt=""
              fill
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-bold text-emerald-500">{`${worker.firstName} ${worker.lastName}`}</p>
            <p className="text-slate-500 text-sm">{worker.email}</p>
            <p className="text-medium float-right">{worker.contactNumber}</p>
            <Rating value={worker.rating} />
          </div>
        </div>
        <div className="self-start">
          <ProjectRequestDialog role={worker.role} worker={worker} />
        </div>
      </div>
      <Separator />
      <DialogTitle>Projects Done</DialogTitle>
      {!isLoading && <WorkerPortfolio portfolio={portfolio} />}
    </div>
  );
};

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

export default WorkerProfileDialog;
