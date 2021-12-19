import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './Customer/customer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://tbldev:tbldev@clustertbl.tnrlz.mongodb.net/test', { useNewUrlParser: true }),
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
