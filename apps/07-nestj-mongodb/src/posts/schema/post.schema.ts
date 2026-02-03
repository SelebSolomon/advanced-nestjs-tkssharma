import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Transform } from 'class-transformer';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({
    required: true,
    trim: true,
  })
  content: string;

  // ✅ reference by model name STRING (prevents circular dependency issues)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Category' }],
    default: [],
  })
  categories: Types.ObjectId[];

  @Prop({
    type: Types.ObjectId,
    ref: 'Series',
  })
  series?: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);

// 🔍 full-text search
PostSchema.index({ title: 'text', content: 'text' });
