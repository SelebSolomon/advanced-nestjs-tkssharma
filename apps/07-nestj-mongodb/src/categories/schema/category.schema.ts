import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Transform } from 'class-transformer';

export type CategoryDocument = Category & mongoose.Document;

@Schema()
export class Category {
  @Transform(({ value }) => value.toString())
  _id: mongoose.ObjectId;

  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
