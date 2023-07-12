import DashboardLayout from "@/components/dashboard-layout";
import { ProjectsTable, projectsColumns } from "@/components/projects-table";
import { Label } from "@/components/ui/label";

const jobs = [
  {
    name: "Website Design",
    dateFinished: "2023-07-11",
    worker: "John Smith",
    service: "Web Design",
    status: "completed",
  },
  {
    name: "App Development",
    dateFinished: "2023-07-12",
    worker: "Jane Doe",
    service: "App Development",
    status: "pending",
  },
  {
    name: "Graphic Design",
    dateFinished: "2023-07-13",
    worker: "Michael Jones",
    service: "Graphic Design",
    status: "completed",
  },
];

const History = () => {
  return (
    <DashboardLayout>
      <section className="flex flex-col items-center col-span-full h-fit">
        <section className="flex flex-col items-center col-span-full h-fit">
          <Label className="text-2xl font-bold text-slate-900">
            Recent Projects
          </Label>
        </section>
      </section>
      <div className="col-span-full flex justify-center">
        <ProjectsTable data={jobs} columns={projectsColumns} />
      </div>
    </DashboardLayout>
  );
};

export default History;
