import { Module } from '@nestjs/common';
import { holdingsService } from './holdings.service';
import { holdingsController } from './holdings.controller';
import { holding } from './entity/holdings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/Users/entity/users.entity';
import { UsersModule } from 'src/Users/users.module';
import { UsersService } from 'src/Users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([holding]),UsersModule
  ],
  controllers: [holdingsController,],
  providers: [holdingsService],
  exports: [holdingsService],
})
export class holdingsModule {}
