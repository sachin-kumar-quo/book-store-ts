import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  publisher: string;

  @Prop()
  published: Date;
}

export type BookDocument = Book & Document;
export const BookSchema = SchemaFactory.createForClass(Book);
