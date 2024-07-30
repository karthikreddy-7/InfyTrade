import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateholdingsDto } from './dto/holdings.create.dto';
import { UpdateholdingsDto } from './dto/holdings.update.dto';
import { holding } from './entity/holdings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/Users/entity/users.entity';
import { UsersService } from 'src/Users/users.service';

@Injectable()
export class holdingsService {
  constructor(
    @InjectRepository(holding)
    private readonly holdingRepository: Repository<holding>,
    private readonly usersService: UsersService,
  ) {}
  async addHolding(createHoldingsDto: CreateholdingsDto): Promise<holding> {
    const { userId, stock, quantity, price } = createHoldingsDto;
  
    let holding = await this.holdingRepository.findOne({ where: { userId, stock } });
  
    if (holding) {
      const totalQuantity = Number(holding.quantity) + Number(quantity);
      const totalCost = Number(holding.quantity) * Number(holding.averagePrice) + Number(quantity) * Number(price);
      holding.quantity = totalQuantity;
      holding.averagePrice = totalCost / totalQuantity;
    } else {
      holding = this.holdingRepository.create({
        userId,
        stock,
        quantity: Number(quantity),
        averagePrice: Number(price),
      });
    }
    const user = await this.usersService.findOne(userId);
    if (user) {
      const totalCost = Number(quantity) * Number(price);
      if (Number(user.balance) < totalCost) {
        throw new BadRequestException(`Insufficient balance. Required: ${totalCost}, Available: ${user.balance}`);
      }
      user.balance = Number(user.balance) - totalCost;
      await this.usersService.update(userId, user);
    } else {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    return this.holdingRepository.save(holding);
  }
  

  async removeHolding(userId: string, stock: string, quantity: number, sellPrice: number): Promise<holding> {
    const holding = await this.holdingRepository.findOne({ where: { userId, stock } });
  
    if (!holding) {
      throw new NotFoundException(`Holding for stock ${stock} not found for user ${userId}`);
    }
  
    if (Number(holding.quantity) < Number(quantity)) {
      throw new BadRequestException(`Insufficient quantity to sell. Available quantity: ${holding.quantity}`);
    }
  
    const totalCost = Number(holding.quantity) * Number(holding.averagePrice);
    const sellTotal = Number(quantity) * Number(sellPrice);
    const profitOrLoss = sellTotal - (Number(quantity) * Number(holding.averagePrice));
  
    holding.quantity = Number(holding.quantity) - Number(quantity);
  
    if (holding.quantity === 0) {
      await this.holdingRepository.remove(holding);
    } else {
      await this.holdingRepository.save(holding);
    }
    const user = await this.usersService.findOne(userId);
    if (user) {
      user.balance = Number(user.balance) + sellTotal;
      user.profit= Number(user.profit) + Number(profitOrLoss);
      await this.usersService.update(userId, user);
    } else {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    return holding;
  }
  

  async findAll(): Promise<holding[]> {
    return this.holdingRepository.find();
  }

  async findOne(id: string): Promise<holding[]> {
    const holding = await this.holdingRepository.find({ where: {userId: id } });
    if (!holding) {
      throw new NotFoundException(`Holding with ID ${id} not found`);
    }
    return holding;
  }

  async update(id: string, updateData: UpdateholdingsDto): Promise<holding> {
    await this.holdingRepository.update(id, updateData);
    const updatedHolding = await this.holdingRepository.findOne({ where: { id } });
    if (!updatedHolding) {
      throw new NotFoundException(`Holding with ID ${id} not found`);
    }
    return updatedHolding;
  }

  async remove(id: string): Promise<void> {
    const result = await this.holdingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Holding with ID ${id} not found`);
    }
  }
}
