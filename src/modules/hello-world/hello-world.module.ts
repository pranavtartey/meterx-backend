import { Module } from '@nestjs/common';
import { HelloWorldController } from './controllers/hello-world.controller';
import { HelloWorldService } from './services/hello-world.service';

@Module({
  controllers: [HelloWorldController],
  providers: [HelloWorldService],
})
export class HelloWorldModule {}
