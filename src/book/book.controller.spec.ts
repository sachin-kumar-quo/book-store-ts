import { Test, TestingModule } from '@nestjs/testing';
import { AuthGaurd } from '../gaurds/auth.gaurd';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import * as HttpMocks from 'node-mocks-http';
import { CreateBookDto } from './dto/index.dto';
import { Author } from 'src/author/author.schema';

describe('Book', () => {
  let controller: BookController;
  let service: BookService;
  const mockBookService = {
    create: jest.fn().mockImplementation((testBook) => testBook),
  };
  const mockRequest = HttpMocks.createRequest();

  const testAuthor: Author = {
    name: 'test',
    age: 20,
    email: 'test@test.com',
    phone: '1234567890',
  };

  const testBook: CreateBookDto = {
    title: 'test',
    author: testAuthor,
    publisher: 'test',
    published: new Date(),
  };

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
    service = module.get<BookService>(BookService);
  });
  it('Controller Should be defined', () => {
    expect(controller.createBook(testBook)).toEqual(testBook);
  });
  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });
});
