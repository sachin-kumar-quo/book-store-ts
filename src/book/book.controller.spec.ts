import { Test, TestingModule } from '@nestjs/testing';
import { AuthGaurd } from '../gaurds/auth.gaurd';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/index.dto';
import { Author } from 'src/author/author.schema';

describe('Bookm Controller', () => {
  let controller: BookController;
  const mockBookService = {
    create: jest.fn().mockImplementation((testBook) => testBook),
    findOne: jest
      .fn()
      .mockImplementation((id: string) =>
        testBooks.find((book) => book.id === id),
      ),
    findAll: jest.fn().mockImplementation(() => testBooks),
    update: jest.fn().mockImplementation((id, book) => {
      const bookToupdate = testBooks.find((book) => book.id === id);
      if (bookToupdate) {
        bookToupdate.title = book.title;
        bookToupdate.publisher = book.publiher;
        bookToupdate.published = book.published;
        bookToupdate.author = book.author;
        return bookToupdate;
      } else {
        return book;
      }
    }),
    delete: jest
      .fn()
      .mockImplementation((id: string) =>
        testBooks.find((book) => book.id === id),
      ),
  };

  const query = {
    page: 1,
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
      controllers: [BookController],
      providers: [
        BookService,
        {
          provide: AuthGaurd,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(BookService)
      .useValue(mockBookService)
      .compile();
    controller = module.get<BookController>(BookController);
  });
  it('Controller Should create book', () => {
    expect(controller.createBook(testBook)).toEqual(testBook);
  });

  it('Controller should return all books', () => {
    expect(controller.getBooks(query)).toEqual(testBooks);
  });

  it('Controller should get the book by id', () => {
    expect(controller.getBookById(testBook.id)).toEqual(testBook);
  });

  it('Controller should update the book', () => {
    expect(
      controller.updateBook(testBook.id, { ...testBook, title: 'new title' }),
    ).toEqual({ ...testBook, title: 'new title' });
  });

  it('Controller should delete the book', () => {
    expect(controller.deleteBook(testBook.id)).toEqual(testBook);
  });
});
