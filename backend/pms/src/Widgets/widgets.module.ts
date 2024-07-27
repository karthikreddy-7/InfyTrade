import { Module } from '@nestjs/common';
import { WidgetsService } from './widgets.service';
import { WidgetsController } from './widgets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Widget } from './entity/widgets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Widget])],
  controllers: [WidgetsController],
  providers: [WidgetsService]
})
export class WidgetsModule {}
