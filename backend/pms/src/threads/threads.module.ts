import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { threadsController } from './threads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Threads } from './entity/threads.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Threads])],
  controllers: [threadsController],
  providers: [ThreadsService],
  exports: [ThreadsService],
})
export class ThreadsModule {}
