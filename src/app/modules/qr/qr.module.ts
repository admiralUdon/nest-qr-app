import { Module } from '@nestjs/common';
import { QRController } from 'app/modules/qr/qr.controller';

@Module({
  controllers: [QRController],
})
export class QRModule {}