import { Module } from '@nestjs/common';
import { MLmodelsService } from './mlmodels.service';
import { MLmodelsController } from './mlmodels.controller';

@Module({
  controllers: [MLmodelsController],
  providers: [MLmodelsService]
})
export class MLmodelsModule {}
