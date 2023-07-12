import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DashboardLayout from "@/components/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserTable, userColumns } from "@/components/user-table";

export const workers = [
  {
    name: "John Doe",
    rating: 5,
    services: ["Bakla", "Adik"],
    role: "contractor",
  },
  {
    name: "John Allen",
    rating: 5,
    services: ["Shabu"],
    role: "laborer",
  },
  {
    name: "Calvin",
    rating: 3.5,
    services: ["Homophobia", "Racism"],
    role: "contractor",
  },
];

const Dashboard = () => {
  const { data: user, isLoading } = useQuery(["user"], async () => {
    const response = await axios.get("/api/auth/me");

    return response;
  });

  return (
    <DashboardLayout>
      <section className="flex flex-col items-center col-span-full h-fit">
        <div className="flex flex-col justify-center items-center">
          {!isLoading ? (
            <Label className="text-2xl font-bold text-slate-900">
              Hello, {user.data["firstName"] + " " + user.data["lastName"]}
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
          <TabsContent value="contractors">
            <UserTable
              data={workers}
              columns={userColumns}
              filter={["services"]}
            />
          </TabsContent>
          <TabsContent value="laborers">
            <UserTable data={workers} columns={userColumns} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
