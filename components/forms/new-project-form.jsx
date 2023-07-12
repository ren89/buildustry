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

const newProjectSchema = z.object({
  name: z.string().min(1, { message: "Project name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  service: z.string().min(1, { message: "Service is required" }),
  worker: z.string().min(1, { message: "Worker is required" }),
});

const NewProjectForm = ({ setOpen, viewOnly, role }) => {
  const form = useForm({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      projectName: "",
      description: "",
      service: "",
      worker: "",
    },
  });

  const { toast } = useToast();

  function onSubmit(values) {
    if (!viewOnly) {
      // TODO add mutation

      toast({
        title: "Request Sent",
        description:
          "Job request has been forwarded to the person you have messaged.",
      });
    }

    setOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormInput
          form={form}
          name="name"
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
          className="bg-emerald-500 w-full mt-4"
          type={viewOnly ? "button" : "submit"}
          onClick={() => viewOnly && setOpen(false)}
        >
          {viewOnly ? "Close" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default NewProjectForm;
