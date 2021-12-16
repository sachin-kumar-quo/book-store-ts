import { User, UserDocument } from '../user.schema';

export class LoginDto {
  id: string;
  email: string;
  password: string;
}
export class registerDto {
  email: string;
  password: string;
  name: string;
}
export class resultDto {
  error: boolean;
  message: string;
  token?: string;
  user?: UserDocument;
}
