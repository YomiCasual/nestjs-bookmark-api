import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [UserModule, BookmarkModule, AuthModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
