import { CreateUserDto } from "../createUserDto";

export class UsersAPI {
  static authURl = 'http://localhost:3000/auth/';
  static usersURl = 'http://localhost:3000/users/';

  static async signup(userDto: CreateUserDto) {
    try {
      const response = await fetch(this.authURl + 'signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDto),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      return data;
    } catch (error) {
      console.error('Signup API error:', error);
      throw error;
    }
  }

  static async checkUserEmail(email: string) {
    try {

      const response = await fetch(this.usersURl + email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        return;
      }
      
      return(`User with email ${email} already exists`);

    } catch (error) {
      console.error('Email API error:', error);
      throw error;
    }
  };
}