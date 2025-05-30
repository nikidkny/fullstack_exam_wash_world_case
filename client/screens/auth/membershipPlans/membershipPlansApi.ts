export class MembershipPlansAPI {
  static baseURl = 'http://localhost:3000/membership-plans/';

  static async getAll() {
    try {
      const response = await fetch(this.baseURl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'membership fetch failed');
      }

      return data;
    } catch (error) {
      console.error('Signup API error:', error);
      throw error;
    }
  }
}
