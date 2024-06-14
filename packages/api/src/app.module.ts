import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChargebeeModule } from './chargebee/chargebee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ChargebeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
