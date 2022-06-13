import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url:
            process.env.PRISMA_URL ??
            'postgresql://postgres:123@localhost:5434/nest',
        },
      },
    });
  }
}
