import { createCardDto } from './createCardDto';

export class CardAPI {
  static cardsUrl = 'http://10.0.0.8:3000/cards/';

  static async createCard(cardDto: createCardDto) {
    console.log('Creating card with DTO:', cardDto);
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
      const response = await fetch(`${this.cardsUrl}user/${userId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch cards');
      }

      const data = await response.json();
      console.log('Fetched cards:', data);
      return data;
    } catch (error) {
      console.error('Get Cards by User ID API error:', error);
      throw error;
    }
  }
  static async updateCard(cardId: number, cardDto: UpdateCardDto) {
    try {
      const response = await fetch(`${this.cardsUrl}${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardDto),
      });

      const data = await response.json();
      console.log('Update Card response IN CARDaPI:', data);
      if (!response.ok) {
        throw new Error(data.message || 'Card update failed');
      }

      return data;
    } catch (error) {
      console.error('Update Card API error:', error);
      throw error;
    }
  }
  static async deleteCard(cardId: number) {
    try {
      const response = await fetch(`${this.cardsUrl}${cardId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete card');
      }

      return { message: 'Card deleted successfully' };
    } catch (error) {
      console.error('Delete Card API error:', error);
      throw error;
    }
  }
}
