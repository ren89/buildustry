import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DashboardLayout from "@/components/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserTable, userColumns } from "@/components/user-table";
import { Skeleton } from "@/components/ui/skeleton";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/db";

const Dashboard = () => {
  const { data: user, isLoading } = useQuery(["user"], async () => {
    const response = await axios.get("/api/auth/me");

    return response.data;
  });

  const { data: users, isLoading: usersLoading } = useQuery(
    ["users"],
    async () => {
      const response = await axios.get("/api/users");
      return response.data;
    }
  );

  return (
    <DashboardLayout role={user?.role}>
      <section className="flex flex-col items-center col-span-full h-fit">
        <div className="flex flex-col justify-center items-center">
          {!isLoading ? (
            <Label className="text-2xl font-bold text-slate-900">
              Hello, {user.firstName + " " + user.lastName}
            </Label>
          ) : null}
          <Label className="text-slate-500">
            Welcome to Buildustry! What are you looking for?
          </Label>
        </div>
      </section>
      <div className="col-span-full flex justify-center">
        <Tabs defaultValue="contractors">
          <TabsList>
            <TabsTrigger value="contractors">Contractors</TabsTrigger>
            <TabsTrigger value="laborers">Laborers</TabsTrigger>
          </TabsList>
          {usersLoading ? (
            <Skeleton className="h-[300px] w-[850px] " />
          ) : (
            <>
              <TabsContent value="contractors">
                <UserTable
                  data={users.filter((user) => user.role === "contractor")}
                  columns={userColumns}
                />
              </TabsContent>
              <TabsContent value="laborers">
                <UserTable
                  data={users.filter((user) => user.role === "laborer")}
                  columns={userColumns}
                />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const authToken = getCookie("auth-token", { req, res });

  const { userId } = jwt.verify(authToken, "your-secret-key");

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (user.role !== "client") {
    return {
      redirect: {
        destination: "/dashboard/worker",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Dashboard;
