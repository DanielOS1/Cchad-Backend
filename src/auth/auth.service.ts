import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Medic } from 'src/medic/medic.entity';
import { Patient } from 'src/patient/patient.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validatePassword(inputPassword: string, storedPassword: string) {
    return inputPassword === storedPassword;
  }

  generateJWT(user: any) {
    const payload = { sub: user.email, user: user };
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
