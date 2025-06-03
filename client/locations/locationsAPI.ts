// src/features/locations/LocationsAPI.ts
import axios from 'axios';
import { LocationEntity } from './locationEntity';

export const LocationsAPI = {
  async getLocations(): Promise<LocationEntity[]> {
    console.log('fetching locations');
    const response = await axios.get('http://localhost:3000/locations'); // change to your actual URL
    return response.data;
  },

  async createLocation(location: LocationEntity): Promise<LocationEntity> {
    const response = await axios.post('http://localhost:3000/locations', location);
    return response.data;
  },

  async removeLocation(id: number): Promise<number> {
    await axios.delete(`http://localhost:3000/locations/${id}`);
    return id;
  },
};
