import { Module } from '@nestjs/common';
import { YachtModule } from './yacht/yacht.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    YachtModule,
    MongooseModule.forRoot('mongodb+srv://hadeeddev:9zIctZwIRswYdrfx@cluster0.zadukmo.mongodb.net/sailaway?retryWrites=true&w=majority&appName=Cluster0')
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
