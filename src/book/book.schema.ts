import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Author } from '../author/author.schema';

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Author' })
  author: Author;

  @Prop()
  publisher: string;

  @Prop()
  published: Date;
}

export type BookDocument = Book & Document;
const BookSchema = SchemaFactory.createForClass(Book);
BookSchema.index({ title: 'text', author: 'text' });
export { BookSchema };
