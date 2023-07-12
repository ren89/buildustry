import DashboardLayout from "@/components/dashboard-layout";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WorkerProfileDialog from "@/components/worker-profile-dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Team = () => {
  const { data: users, isLoading: usersLoading } = useQuery(
    ["users"],
    async () => {
      const response = await axios.get("/api/users");
      return response.data;
    }
  );

  return (
    <DashboardLayout>
      <section className="flex flex-col items-center col-span-full h-fit">
        <Label className="text-2xl font-bold text-slate-900">My Team</Label>
      </section>
      <section className="flex flex-col items-center col-span-full h-fit">
        <div className="flex gap-4">
          {usersLoading ? (
            <>
              <Skeleton className="h-[300px] w-[18rem]" />
              <Skeleton className="h-[300px] w-[18rem]" />
            </>
          ) : (
            <>
              <Card className="min-w-[18rem]">
                <CardHeader className="font-bold text-lg">
                  Contractors
                </CardHeader>
                <CardContent className="space-y-3">
                  {users
                    .filter((user) => user.role === "contractor")
                    .map((worker, index) => {
                      return (
                        <div
                          className="flex justify-between items-center gap-4"
                          key={index}
                        >
                          <div>
                            <p>{`${worker.firstName} ${worker.lastName}`}</p>
                          </div>
                          <WorkerProfileDialog worker={worker}>
                            <Button variant="outline" className="flex gap-2">
                              <Eye size={24} strokeWidth={1.5} />
                              <span>View</span>
                            </Button>
                          </WorkerProfileDialog>
                        </div>
                      );
                    })}
                </CardContent>
              </Card>
              <Card className="min-w-[18rem]">
                <CardHeader className="font-bold text-lg">Laborers</CardHeader>
                <CardContent className="space-y-3">
                  {users
                    .filter((user) => user.role === "laborer")
                    .map((worker, index) => {
                      return (
                        <div
                          className="flex justify-between items-center gap-4"
                          key={index}
                        >
                          <div>
                            <p>{`${worker.firstName} ${worker.lastName}`}</p>
                          </div>
                          <WorkerProfileDialog worker={worker}>
                            <Button variant="outline" className="flex gap-2">
                              <Eye size={24} strokeWidth={1.5} />
                              <span>View</span>
                            </Button>
                          </WorkerProfileDialog>
                        </div>
                      );
                    })}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Team;
