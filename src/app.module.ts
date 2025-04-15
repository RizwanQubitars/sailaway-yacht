import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YachtModule } from './yacht/yacht.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    YachtModule,
    MongooseModule.forRoot('mongodb+srv://razwanthebest24:T5we15umBlC4ZsyA@cluster0.ki68w9o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
