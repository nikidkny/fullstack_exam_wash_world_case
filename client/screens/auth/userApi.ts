import { CreateUserDto } from "./createUserDto";

export class UsersAPI {
    static baseUrl = 'http://localhost:3000/auth/'

    static async signup(userDto: CreateUserDto) {
      const response = await fetch(UsersAPI.baseUrl + 'signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDto),
      });
      const data = await response.json();
      return data;
    }
}