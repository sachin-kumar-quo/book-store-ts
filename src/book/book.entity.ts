import { Author } from 'src/author/author.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToOne((type) => Author)
  @JoinColumn()
  author: Author;

  @Column()
  published: Date;

  @Column()
  publisher: string;
}
