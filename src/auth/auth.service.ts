import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthResult } from './auth.resolver';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validatePassword(
    inputPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(inputPassword, storedPassword);
    return isMatch;
  }

  generateJWT(user: any, role: string): AuthResult {
    const payload = { user: user, role: role };
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
