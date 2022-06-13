import { ISignIn } from './../dto/index';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignupDto } from 'src/dto';
import * as argon from 'argon2';
import { DbService } from 'src/db/db.service';

@Injectable({})
export class AuthService {
  constructor(private db: DbService) {}

  async signin({ body }: { body: ISignIn }) {
    const { email, password } = body;

    try {
      const user = await this.db.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        throw new ForbiddenException('Invalid Credentials');
      }

      const passwordMatches = await argon.verify(user.password, password);

      if (!passwordMatches) {
        throw new ForbiddenException('Invalid Credentials');
      }

      delete user?.password;

      return {
        message: 'Fetched Successfully',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }
  async signup({ body }: { body: SignupDto }) {
    const { email, password, name } = body;
    try {
      const hashPassword = await argon.hash(password);

      const user = await this.db.user.create({
        data: {
          email,
          password: hashPassword,
          name,
        },
      });

      delete user.password;

      return {
        message: 'Signed Up',
        data: user,
      };
    } catch (e) {
      console.log({ status: e });
      return {
        message: 'Error singin up',
        status: 'ah',
      };
    }
  }
}
