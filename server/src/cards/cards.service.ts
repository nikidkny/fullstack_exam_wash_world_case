import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
// import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    // Check for existing card
    const existingCard = await this.findByUserId(createCardDto.user);
    // If a card already exists for the user, throw a conflict exception
    if (existingCard.length > 0) {
      throw new ConflictException('User already has a payment card');
    }
    // Create a new card instance
    const card = this.cardRepository.create({
      cardholder_name: createCardDto.cardholder_name,
      card_number: createCardDto.card_number,
      cvc: createCardDto.cvc,
      expiry_date: createCardDto.expiry_date,
      user: { id: createCardDto.user },
    });
    // Save the card to the database
    return this.cardRepository.save(card);
  }

  findAll() {
    return this.cardRepository.find();
  }

  findOne(id: number) {
    return this.cardRepository.findOneBy({ id });
  }

  findByUserId(userId: number) {
    // Find all cards associated with the user ID
    return this.cardRepository.find({ where: { user: { id: userId } } });
  }

  async update(id: number, updateCardDto: Partial<CreateCardDto>) {
    // Check if the card exists
    const card = await this.cardRepository.findOneBy({ id });
    // If the card does not exist, throw an error
    if (!card) {
      throw new Error('Card not found');
    }
    // Update the card with the new data
    Object.assign(card, updateCardDto);
    return this.cardRepository.save(card);
  }

  remove(id: number) {
    return this.cardRepository.delete(id);
  }
}
