import { createCardDto } from './createCardDto';

export class CardAPI {
  static cardsUrl = 'http://10.0.0.8:3000/cards/';

  static async createCard(cardDto: createCardDto) {
    try {
      const response = await fetch(this.cardsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardDto),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Card creation failed');
      }

      return data;
    } catch (error) {
      console.error('Create Card API error:', error);
      throw error;
    }
  }

  static async createCardByUserId(userId: number, cardDto: createCardDto) {
    try {
      const response = await fetch(`${this.cardsUrl}user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardDto),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Card creation failed');
      }

      return data;
    } catch (error) {
      console.error('Create Card API error:', error);
      throw error;
    }
  }

  static async getCardsByUserId(userId: number) {
    try {
      const response = await fetch(`${this.cardsUrl}user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data.length ? data : [''];
    } catch (error) {
      console.error('Get Cards by User ID API error:', error);
      return [''];
    }
  }
  static async updateCard(cardId: string, cardDto: UpdateCardDto) {
    try {
      const response = await fetch(`${this.cardsUrl}${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardDto),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Card update failed');
      }

      return data;
    } catch (error) {
      console.error('Update Card API error:', error);
      throw error;
    }
  }
}
