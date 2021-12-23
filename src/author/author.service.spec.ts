import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { Author } from './author.schema';
import { AuthorService } from './author.service';

describe('Author Service', () => {
  let service: AuthorService;
  const mockRepository = {
    find: jest.fn().mockImplementation(() => testAuthors),
    findById: jest.fn().mockImplementation((id) => ({ id: id, ...testAuthor })),
    create: jest
      .fn()
      .mockImplementation((author) => ({ ...author, id: 'fake' })),
    findByIdAndUpdate: jest.fn().mockImplementation((id, author) => author),
    findByIdAndRemove: jest
      .fn()
      .mockImplementation((id) => ({ id: id, ...testAuthor })),
    save: jest.fn().mockImplementation((author) => author),
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
      providers: [
        AuthorService,
        {
          provide: getModelToken(Author.name),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<AuthorService>(AuthorService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('service should find all the authors', () => {
    service
      .findAll(query)
      .then((authors) => {
        expect(authors).toEqual(testAuthors);
      })
      .catch((err) => {
        expect(err).toBeUndefined();
      });
  });

  it('service should find author by id', () => {
    service
      .findOne('fake')
      .then((author) => {
        expect(author).toEqual({ id: 'fake', ...testAuthor });
      })
      .catch((err) => {
        expect(err).toBeUndefined();
      });
  });

  it('service should create a book', () => {
    service
      .create(testAuthor)
      .then((author) => {
        expect(author).toEqual({ ...testAuthor, id: 'fake' });
      })
      .catch((err) => {
        expect(err).toBeUndefined();
      });
  });

  it('service should update a book', () => {
    service
      .update('fake', testAuthor)
      .then((author) => {
        expect(author).toEqual({ id: 'fake', ...testAuthor });
      })
      .catch((err) => {
        expect(err).toBeUndefined();
      });
  });

  it('service should delete a book', () => {
    service
      .delete('fake')
      .then((author) => {
        expect(author).toEqual({ id: 'fake', ...testAuthor });
      })
      .catch((err) => {
        expect(err).toBeUndefined();
      });
  });
});
