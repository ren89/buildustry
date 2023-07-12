import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import NewProjectForm from "./forms/new-project-form";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const ProjectRequestDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="float-right flex gap-2">
          <Send size={24} strokeWidth={1} />
          <span>Message</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project</DialogTitle>
        </DialogHeader>
        <NewProjectForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectRequestDialog;
