import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Dashboard = () => {
  const { data } = useQuery(["user"], async () => {
    const response = await axios.get("/api/auth/me");

    return response;
  });

  return <pre>{JSON.stringify(data?.data, null, 2)}</pre>;
};

export default Dashboard;
