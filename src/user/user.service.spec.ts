import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.schema';
import { UserService } from './user.service';

describe('User Service', () => {
  let service: UserService;
  const mockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });
});
