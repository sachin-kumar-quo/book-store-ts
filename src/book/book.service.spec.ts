import { Test, TestingModule } from '@nestjs/testing';
import { AuthGaurd } from '../gaurds/auth.gaurd';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('Book', () => {
  let controller: BookController;
  let service: BookService;
  const mockBookService = {};
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
    expect(controller).toBeDefined();
  });
  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });
});
