import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Eye, Send } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Image from "next/image";
import Rating from "./rating";
import { Separator } from "./ui/separator";
import ProjectRequestDialog from "./project-request-dialog";

const WorkerProfileDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2">
          <Eye size={24} strokeWidth={1.5} />
          <span>View</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Worker Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Name, Email, Contact, Rating, Project */}
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
                <p className="text-xl font-bold text-emerald-500">John Doe</p>
                <p className="text-slate-500 text-sm">johndoe@email.com</p>
                <p className="text-medium float-right">09961235678</p>
                <Rating value={4} />
              </div>
            </div>
            <div className="self-start">
              <ProjectRequestDialog />
            </div>
          </div>
          <Separator />
          <DialogTitle>Projects Done</DialogTitle>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkerProfileDialog;
