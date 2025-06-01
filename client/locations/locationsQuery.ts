// hooks/useLocations.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetLocations = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const { data } = await axios.get('http://10.0.0.8:3000/locations');
      return data;
    },
  });
};
