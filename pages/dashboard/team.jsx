import DashboardLayout from "@/components/dashboard-layout";
import { Label } from "@/components/ui/label";
import { workers } from ".";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const Team = () => {
  return (
    <DashboardLayout>
      <section className="flex flex-col items-center col-span-full h-fit">
        <Label className="text-2xl font-bold text-slate-900">My Team</Label>
      </section>
      <section className="flex flex-col items-center col-span-full h-fit">
        <div className="flex gap-4">
          <Card className="min-w-[18rem]">
            <CardHeader className="font-bold text-lg">Contractors</CardHeader>
            <CardContent className="space-y-3">
              {workers.map((worker, index) => {
                return (
                  <div
                    className="flex justify-between items-center"
                    key={index}
                  >
                    <div>
                      <p>{worker.name}</p>
                    </div>
                    <Button className="flex gap-2" variant="outline">
                      <Eye size={24} strokeWidth={1.5} />
                      <span>View</span>
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
          <Card className="min-w-[18rem]">
            <CardHeader className="font-bold text-lg">Laborers</CardHeader>
            <CardContent className="space-y-3">
              {workers.map((worker, index) => {
                return (
                  <div
                    className="flex justify-between items-center"
                    key={index}
                  >
                    <div>
                      <p>{worker.name}</p>
                    </div>
                    <Button className="flex gap-2" variant="outline">
                      <Eye size={24} strokeWidth={1.5} />
                      <span>View</span>
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Team;
