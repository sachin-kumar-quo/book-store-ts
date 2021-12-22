import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  phone: string;
}
