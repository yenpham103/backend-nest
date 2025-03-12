import { Global, Module } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';
import { HashingService } from './service/hashing.service';
import { TokenService } from './service/token.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from './guards/access-token.guard';
import { ApiKeyGuard } from './guards/api-key.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { SharedUserRepository } from './repositories/shared-user.repo';
import { EmailService } from './service/email.service';

const shareService = [PrismaService, HashingService, TokenService, SharedUserRepository, EmailService]

@Global()
@Module({
    providers: [...shareService, AccessTokenGuard, ApiKeyGuard, {
        provide: 'APP_GUARD', // Phải là APP_GUARD thì mới chạy được  Guard
        useClass: AuthenticationGuard
    }],
    exports: shareService,
    imports: [JwtModule]
})
export class SharedModule { }
