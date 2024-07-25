import { Module } from '@nestjs/common';
import { MLmodelsService } from './mlmodels.service';
import { MLmodelsController } from './mlmodels.controller';
import { MLmodels } from './entity/mlmodels.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MLmodels])],
  controllers: [MLmodelsController],
  providers: [MLmodelsService]
})
export class MLmodelsModule {}
