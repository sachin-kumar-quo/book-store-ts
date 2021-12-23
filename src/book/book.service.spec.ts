import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/index.dto';
import { Author } from 'src/author/author.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './book.schema';

describe('Book Service ', () => {
  let service: BookService;

  const mockRepository = {
    save: jest.fn().mockImplementation((result) => result),
    find: jest.fn().mockImplementation((query) => testBooks),
    findById: jest
      .fn()
      .mockImplementation((id) => testBooks.find((book) => book.id === id)),
    create: jest.fn().mockImplementation((result) => result),
    findByIdAndUpdate: jest.fn().mockImplementation((id, result) => {
      return result;
    }),
    findByIdAndDelete: jest
      .fn()
      .mockImplementation((id) => testBooks.find((book) => book.id === id)),
  };

  const query = {
    skip: 0,
    limit: 10,
    text: '',
    sort: '',
    order: 1,
  };

  const testAuthor: Author = {
    name: 'test',
    age: 20,
    email: 'test@test.com',
    phone: '1234567890',
  };

  const testBook: CreateBookDto = {
    id: '1',
    title: 'test',
    author: testAuthor,
    publisher: 'test',
    published: new Date(),
  };

  const testBooks: CreateBookDto[] = [
    testBook,
    { ...testBook, title: 'test2', id: '2' },
    { ...testBook, title: 'test3', id: '3' },
    { ...testBook, title: 'test4', id: '4' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: getModelToken(Book.name), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Service should create book', () => {
    service
      .create(testBook)
      .then((book) => {
        expect(book).toEqual(testBook);
      })
      .catch((err) => {
        expect(err).toBeUndefined();
      });
  });

  it('Service should get book by Id', () => {
    service
      .findOne(testBook.id)
      .then((book) => {
        expect(book).toEqual(testBook);
      })
      .catch((err) => {
        expect(err).toBeUndefined();
      });
  });

  it('Service should get all books', () => {
    service
      .findAll(query)
      .then((book) => {
        expect(book).toEqual(testBooks);
      })
      .catch((err) => {
        expect(err).toBeUndefined();
      });
  });

  it('Service should update book', () => {
    service
      .update(testBook.id, { ...testBook, title: 'test5' })
      .then((book) => {
        expect(book).toEqual({ ...testBook, title: 'test5' });
      })
      .catch((err) => {
        expect(err).toBeUndefined();
      });
  });

  it('Service should delete book', () => {
    service
      .delete(testBook.id)
      .then((book) => {
        expect(book).toEqual(testBook);
      })
      .catch((err) => {
        expect(err).toBeUndefined();
      });
  });
});
