import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Author {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

export type AuthorDocument = Author & Document;
export const AuthorSchema = SchemaFactory.createForClass(Author);
