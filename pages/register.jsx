import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import FormInput from "@/components/form-input";
import FormSelect from "@/components/form-select";

const formSchema = z
  .object({
    username: z.string().min(3, { message: "Username is required" }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password is too short" }).max(50),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export default function Register() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      contactNumber: "",
      email: "",
      role: "client",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }
  return (
    <main className="min-h-screen flex">
      <div className="w-1/2 min-h-full relative">
        <Image src="/images/building.jpg" alt="Building" fill />
      </div>
      <div className="w-1/2 min-h-full flex flex-col justify-center items-center">
        <h1 className="uppercase text-emerald-500 font-black tracking-tight text-4xl mb-4">
          Buildustry
        </h1>
        <Card className="min-w-[400px]">
          <CardHeader>
            <CardTitle className=" font-bold text-2xl">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <div className="flex gap-2">
                  <FormInput
                    form={form}
                    name="firstName"
                    label="First Name"
                    placeholder="First Name"
                  />
                  <FormInput
                    form={form}
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                  />
                </div>
                <FormInput
                  form={form}
                  name="username"
                  label="Username"
                  placeholder="Username"
                />
                <FormInput
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="Email"
                />
                <FormInput
                  form={form}
                  name="contactNumber"
                  label="Contact Number"
                  placeholder="Contact Number"
                />
                <FormSelect
                  form={form}
                  name="role"
                  label="Role"
                  placeholder="Role"
                  options={[
                    { label: "Client", value: "client" },
                    { label: "Laborer", value: "laborer" },
                    { label: "Contractor", value: "contractor" },
                  ]}
                />
                <FormInput
                  form={form}
                  name="password"
                  label="Password"
                  placeholder="Password"
                  type="password"
                />
                <FormInput
                  form={form}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                />
                <Button className="bg-emerald-500 w-full mt-4" type="submit">
                  Register
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p>
              Already a user?{" "}
              <Link href="/" className="text-emerald-500 font-semibold">
                Login Here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
