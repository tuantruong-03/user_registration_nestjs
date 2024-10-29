// database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_DATABASE_URI)
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
