import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "../ui/form";
import FormInput from "../form-input";
import FormSelect from "../form-select";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const newProjectSchema = z.object({
  name: z.string().min(1, { message: "Project name is required" }),
  service: z.string().min(1, { message: "Service is required" }),
  worker: z.string().min(1, { message: "Worker is required" }),
  sqm: z.coerce.number().min(1, { message: "Square meters is required" }),
  floors: z.coerce.number().min(1, { message: "Floor is required" }),
});

const NewProjectForm = ({ setOpen }) => {
  const form = useForm({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      name: "",
      service: "",
      sqm: 0,
      floors: 0,
    },
  });

  const { toast } = useToast();

  function onSubmit(values) {
    toast({
      title: "Request Sent",
      description:
        "Job request has been forwarded to the person you have messaged.",
    });

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
        />
        <FormInput
          form={form}
          name="worker"
          label="Worker"
          placeholder="Worker"
        />
        <FormSelect
          form={form}
          name="service"
          label="Service"
          placeholder="Select a Service"
          options={[
            { label: "Website Design", value: "web" },
            { label: "App Development", value: "app" },
            { label: "Graphic Design", value: "gd" },
          ]}
        />
        <FormInput
          form={form}
          name="sqm"
          label="Square Meters"
          placeholder="Square Meters"
          type="number"
        />
        <FormInput
          form={form}
          name="floors"
          label="Floors"
          placeholder="Floors"
          type="number"
        />

        <Button className="bg-emerald-500 w-full mt-4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default NewProjectForm;
