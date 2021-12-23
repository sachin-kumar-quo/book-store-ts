import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('user Controller', () => {
  let controller: UserController;
  const userService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: JwtService,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();
    controller = module.get<UserController>(UserController);
  });

  it('Controller should be Defined', () => {
    expect(controller).toBeDefined();
  });
});
