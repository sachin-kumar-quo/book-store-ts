import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { Author } from './author.schema';
import { AuthorService } from './author.service';

describe('Author Controller', () => {
  let controller: AuthorController;
  const mockService = {
    findAll: jest.fn().mockImplementation(() => testAuthors),
    findOne: jest.fn().mockImplementation((id) => ({ id: id, ...testAuthor })),
    create: jest
      .fn()
      .mockImplementation((author) => ({ ...author, id: 'fake' })),
    update: jest
      .fn()
      .mockImplementation((id, author) => ({ id: id, ...author })),
    delete: jest.fn().mockImplementation((id) => ({ id: id, ...testAuthor })),
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

  const testAuthors = [
    testAuthor,
    { ...testAuthor, name: 'test2' },
    { ...testAuthor, name: 'test3' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [AuthorService],
    })
      .overrideProvider(AuthorService)
      .useValue(mockService)
      .compile();
    controller = module.get<AuthorController>(AuthorController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Controller should find all the authors', () => {
    expect(controller.getAuthors(query)).toEqual(testAuthors);
  });

  it('Controller should find author by id', () => {
    expect(controller.getAuthor('fake')).toEqual({ ...testAuthor, id: 'fake' });
  });

  it('Controller should create a book', () => {
    expect(controller.createAuthor(testAuthor)).toEqual({
      ...testAuthor,
      id: 'fake',
    });
  });

  it('Controller should update a book', () => {
    expect(controller.updateAuthor('fake', testAuthor)).toEqual({
      ...testAuthor,
      id: 'fake',
    });
  });

  it('Controller should delete a book', () => {
    expect(controller.deleteAuthor('fake')).toEqual({
      ...testAuthor,
      id: 'fake',
    });
  });
});
