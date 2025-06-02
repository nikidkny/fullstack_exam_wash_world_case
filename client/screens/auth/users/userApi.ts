import { CreateUserDto } from './createUserDto';
import { LoginUserDto } from './loginUserDto';

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

  static async login(userDto: LoginUserDto) {
    try {
      const response = await fetch(this.authURl + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDto),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return data;
    } catch (error) {
      // console.log('Login API error:', error);
      throw error;
    }
  }

  static async checkUserEmail(email: string) {
    try {
      const response = await fetch(this.usersURl + '/email/' + email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return;
      }

      return `User with email ${email} already exists`;
    } catch (error) {
      console.error('Email API error:', error);
      throw error;
    }
  }

  static async getUserById(userId: number) {
    try {
      const url = this.usersURl + userId;
      // console.log('GET', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Response status:', response.status);
        console.error('Response text:', text);
        throw new Error('Failed to fetch user details');
      }

      return await response.json();
    } catch (error) {
      console.error('Get User API error:', error);
      throw error;
    }
  }
  static async updateUserById(userId: number, userData: Partial<CreateUserDto>) {
    // console.log('Update User API called with userId:', userId, 'and userData:', userData);
    const response = await fetch(`${this.usersURl}${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    // console.log('Update User Response:', data);
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update user');
    }
    // console.log('User updated successfully userApi:', data);
    return data;
  }

  static async deleteUserById(userId: number) {
    try {
      const response = await fetch(`${this.usersURl}${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Response status:', response.status);
        console.error('Response text:', text);
        throw new Error('Failed to delete user');
      }

      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error('Delete User API error:', error);
      throw error;
    }
  }
}
