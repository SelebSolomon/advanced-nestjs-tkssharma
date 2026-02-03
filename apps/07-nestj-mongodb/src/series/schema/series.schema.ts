import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Transform } from 'class-transformer';

export type SeriesDocument = Series & mongoose.Document;

@Schema()
export class Series {
  @Transform(({ value }) => value.toString())
  _id: mongoose.ObjectId;

  @Prop()
  name: string;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
