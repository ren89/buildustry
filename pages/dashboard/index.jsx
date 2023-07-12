import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Rating from "@/components/rating";

const tempWorkers = [
  {
    name: "John Doe",
    rating: 5,
  },
  {
    name: "John Allen",
    rating: 5,
  },
  {
    name: "Calvin",
    rating: 3.5,
  },
];

const Dashboard = () => {
  const { data: user, isLoading } = useQuery(["user"], async () => {
    const response = await axios.get("/api/auth/me");

    return response;
  });
  console;

  return (
    <main className="min-h-screen flex flex-col  items-center">
      {!isLoading ? (
        <Label className="text-2xl font-bold text-slate-900">
          Hello, {user.data["firstName"] + " " + user.data["lastName"]}
        </Label>
      ) : null}
      <Label className="text-slate-500">
        Welcome to Buildustry! What are you looking for?
      </Label>
      <WorkerTable workers={tempWorkers} />
      {/* HomePage1 */}
      {/* <div className="flex mt-10">
        <CustomCard
          icon="/images/frame.png"
          heading="Contractors"
          content="Get in touch with the best contractors in the industry"
        />
        <CustomCard
          icon="/images/hard-hat.png"
          heading="Laborers"
          content="Contact the best individuals for your specific needs"
        />
      </div> */}
      {/* <pre>{JSON.stringify(user?.data, null, 2)}</pre> */}
    </main>
  );
};

const CustomCard = ({ icon, heading, content }) => {
  return (
    <Card className="w-[250px] mx-2 p-2">
      <CardContent className="flex flex-col items-center justify-center">
        <Image src={icon} alt="Building" width={100} height={100} />
        <Label className="text-2xl font-bold text-slate-900">{heading}</Label>
        <Label className="text-sm text-slate-500 text-center">{content}</Label>
      </CardContent>
    </Card>
  );
};

const WorkerTable = (workers) => {
  console.log(workers.workers);
  return (
    <Card className="w-[850px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workers.workers.map((worker) => {
            return (
              <TableRow key={worker.name}>
                <TableCell className="font-medium">{worker.name}</TableCell>
                <TableCell>
                  <Rating value={worker.rating} />
                </TableCell>
                <TableCell className="text-right">
                  <Button className="bg-white text-black py-2">
                    <Image
                      src="/images/send.png"
                      alt="Building"
                      width={24}
                      height={24}
                      className="mr-4"
                    />
                    Message
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default Dashboard;
