// hooks/useLocations.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/locations");
      return data;
    },
  });
};
