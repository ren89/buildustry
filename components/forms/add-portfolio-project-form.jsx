import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "../ui/form";
import FormInput from "../form-input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const newProjectSchema = z.object({
  name: z.string().min(1, { message: "Project name is required" }),
});

const AddPortfolioProjectForm = ({ setOpen, firstTime = false }) => {
  const { data: user } = useQuery(["user"], async () => {
    const response = await axios.get("/api/auth/me");

    return response.data;
  });

  const form = useForm({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      name: "",
    },
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (values) => {
      // TODO add mutation

      if (firstTime) {
        return (
          await axios.post(`/api/users/${user.id}/portfolio`, {
            projects: [
              {
                name: values.name,
                images: [],
              },
            ],
          })
        ).data;
      }

      return (await axios.put(`/api/users/${user.id}/portfolio`, values)).data;
    },
    {
      onSuccess(data) {
        // TODO add toast message

        toast({
          title: "Project added to portfolio",
          description: "Project was added to your profile",
        });

        queryClient.invalidateQueries(["portfolio", user.id]);
        setOpen(false);
      },
    }
  );

  function onSubmit(values) {
    mutate(values);
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
        <Button
          className="bg-emerald-500 hover:bg-emerald-600 w-full mt-4"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddPortfolioProjectForm;
