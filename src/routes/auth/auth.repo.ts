import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/service/prisma.service";
import { RegisterBodyType, VerificationCodeType } from "./auth.model";
import { UserType } from "src/shared/models/shared-user.model";
import { TypeOfVerificationCodeType } from "src/shared/constants/auth.constant";

@Injectable()
export class AuthRepository {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async createUser(user: Omit<RegisterBodyType, 'confirmPassword' | 'code'> & Pick<UserType, 'roleId'>): Promise<Omit<UserType, 'password' | 'totpSecret'>> {
        return await this.prismaService.user.create({
            data: user,
            omit: {
                password: true,
                totpSecret: true,
            }
        })
    }

    async createVerificationCode(payload: Pick<VerificationCodeType, 'email' | 'code' | 'type' | 'expiresAt'>): Promise<VerificationCodeType> {
        return await this.prismaService.verificationCode.upsert({
            where: {
                email: payload.email
            },
            create: payload,
            update: {
                code: payload.code,
                expiresAt: payload.expiresAt
            }
        })
    }

    async findUniqueVerificationCode (uniqueValue: {email: string } | {id: number} | {email: string, code: string, type: TypeOfVerificationCodeType}) {
        return await this.prismaService.verificationCode.findUnique({
            where: uniqueValue
        })
    }
}