import { Injectable,CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate{
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'];
    if (!auth || !auth.startsWith('Bearer ')) throw new UnauthorizedException();

    try {
      const token = auth.split(' ')[1];
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      request.user = { userId: payload.sub, username: payload.username };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}