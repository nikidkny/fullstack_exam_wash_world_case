import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ConflictException,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
// import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    try {
      // Attempt to create a new card
      return await this.cardsService.create(createCardDto);
    } catch (error) {
      // If a conflict occurs (e.g., user already has a card), throw a ConflictException
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }
  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @Get('/user/:userId')
  findByUserId(@Param('userId') userId: number) {
    return this.cardsService.findByUserId(+userId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardDto: Partial<CreateCardDto>,
  ) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cardsService.remove(+id);
  }
}
