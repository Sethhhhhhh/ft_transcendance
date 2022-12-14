import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AvatarModule } from './avatar/avatar.module';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        AvatarModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
