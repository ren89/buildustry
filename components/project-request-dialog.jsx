import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import NewProjectForm from "./forms/new-project-form";
import { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

const ProjectRequestDialog = ({
  children,
  viewOnly = false,
  role,
  worker,
  project,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            onClick={(e) => e.stopPropagation()}
            variant="outline"
            className="float-right items-center flex gap-2"
          >
            <PlusCircle size={24} strokeWidth={1} />
            <span>Request Service</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project</DialogTitle>
        </DialogHeader>
        <NewProjectForm
          setOpen={setOpen}
          viewOnly={viewOnly}
          role={role}
          worker={worker}
          project={project}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectRequestDialog;
