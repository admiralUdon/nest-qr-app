import { Module } from '@nestjs/common';
import { HelloController } from 'app/modules/hello/hello.controller';

@Module({
  controllers: [HelloController],
})
export class HelloModule {}