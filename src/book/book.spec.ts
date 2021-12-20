import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('Book', () => {
  let controller: BookController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();
    controller = module.get<BookController>(BookController);
  });
  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });
});
