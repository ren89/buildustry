import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "../ui/form";
import FormInput from "../form-input";
import FormSelect from "../form-select";
import FormTextArea from "../form-text-area";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { services } from "@/lib/services";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const newProjectSchema = z.object({
  projectName: z.string().min(1, { message: "Project name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  service: z.string().optional(),
  worker: z.string().min(1, { message: "Worker is required" }),
});

const NewProjectForm = ({ setOpen, viewOnly, role, worker }) => {
  const form = useForm({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      projectName: "",
      description: "",
      service: "",
      worker: `${worker.firstName} ${worker.lastName}`,
    },
  });

  const { toast } = useToast();

  const { mutate } = useMutation(
    async (values) => {
      await axios.post("/api/projects", {
        typeOfService: values.service,
        name: values.projectName,
        description: values.description,
        workerId: worker.id,
      });
    },
    {
      onSuccess() {
        toast({
          title: "Request Sent",
          description:
            "Job request has been forwarded to the person you have messaged.",
        });
        setOpen(false);
      },
    }
  );

  function onSubmit(values) {
    if (!viewOnly) {
      mutate(values);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormInput
          form={form}
          name="projectName"
          label="Project Name"
          placeholder="Project Name"
          viewOnly={viewOnly}
        />
        <FormTextArea
          form={form}
          name="description"
          label="Description"
          placeholder="Description"
          viewOnly={viewOnly}
        />
        <FormInput
          form={form}
          name="worker"
          label="Worker"
          placeholder="Worker"
          viewOnly={true}
        />
        {role === "laborer" && (
          <FormSelect
            form={form}
            name="service"
            label="Service"
            placeholder="Select a Service"
            options={services}
            viewOnly={viewOnly}
          />
        )}

        <Button
          disabled={viewOnly}
          className="bg-emerald-500 hover:bg-emerald-600 w-full mt-4"
          type={viewOnly ? "button" : "submit"}
          // onClick={() => viewOnly && setOpen(false)}
        >
          {viewOnly ? "Close" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default NewProjectForm;
