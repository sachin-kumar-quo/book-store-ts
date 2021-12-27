import { Author } from 'src/author/author.entity';
import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
import { ConnectionOptions } from 'typeorm';
const ormConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3406,
  username: 'root',
  password: 'mypassword',
  database: 'nestbookStore',
  synchronize: false,
  logging: false,
  entities: [Book, Author, User],
  migrations: ['src/migration/*.ts'],
  subscribers: ['src/subscriber/*.ts'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
export default ormConfig;
