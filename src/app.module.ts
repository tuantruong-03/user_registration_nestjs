import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { config } from 'dotenv';

config()
@Module({
  imports: [UserModule, DatabaseModule],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}
