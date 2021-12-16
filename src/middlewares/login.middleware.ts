import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class IsLoggedInMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const data = await this.jwtService.verifyAsync(token);
      if (data.id) {
        next();
      }
    } catch (error) {
      res.redirect('/auth/login');
    }
  }
}
