import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { HashingService } from 'src/shared/service/hashing.service';
import { RolesService } from './roles.service';
import { RegisterBodyType, SendOTPBodyType } from './auth.model';
import { AuthRepository } from './auth.repo';
import { SharedUserRepository } from 'src/shared/repositories/shared-user.repo';
import { generateOTP } from 'src/shared/helper';
import { addMilliseconds } from 'date-fns';
import envConfig from 'src/shared/config';
import ms from 'ms'
import { TypeOfVerificationCode } from 'src/shared/constants/auth.constant';
import { EmailService } from 'src/shared/service/email.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly hashingService: HashingService,
        private readonly rolesService: RolesService,
        private readonly authRepository: AuthRepository,
        private readonly sharedUserRepository: SharedUserRepository,
        private readonly emailService: EmailService 
    ) { }
    async register(body: RegisterBodyType) {
        try {
            const verificationCode = await this.authRepository.findUniqueVerificationCode({
                email: body.email,
                code: body.code,
                type: TypeOfVerificationCode.REGISTER
            })
            
            if(!verificationCode) {
                throw new UnprocessableEntityException([
                    {
                        message: "Verification code is invalid",
                        path: "code"
                    }
                ])
            }
            if(verificationCode.expiresAt < new Date()) {
                throw new UnprocessableEntityException([
                    {
                        message: "Verification code is expired",
                        path: "code"
                    }
                ])
            }
            const clientRoleID = await this.rolesService.getClientRoleId()
            const hashPassword = await this.hashingService.hash(body.password)
            return await this.authRepository.createUser({
                email: body.email,
                name: body.name,
                phoneNumber: body.phoneNumber,
                password: hashPassword,
                roleId: clientRoleID
            })
        } catch (e) {
            console.log(e);
            throw e
        }
    }

    async sendOTP(body: SendOTPBodyType) {
        
        // 1. Kiểm tra email đã tồn tại hay chưa (db)
        const user = await this.sharedUserRepository.findUnique({ email: body.email })
        if (user) {
            throw new UnprocessableEntityException("Email already exists")
        }

        // 2. Tạo mã OTP
        const code = generateOTP()

        const verificationCode = await this.authRepository.createVerificationCode({
            email: body.email,
            code,
            type: body.type,
            expiresAt: addMilliseconds(new Date(), ms(envConfig.OTP_EXPIRES_IN))
        })

        // 3. Gửi mã OTP
        const {error}  = await this.emailService.sendOTP({
            email: body.email,
            code
        })

        if(error) {
            throw new UnprocessableEntityException([{
                message: "Failed to send OTP",
                path: "code"
            }])
        }

        return verificationCode
    }
    

    // async login(body: any) {
    //     const user = await this.prismaService.user.findUnique({
    //         where: {
    //             email: body.email
    //         }
    //     })
    //     if (!user) {
    //         throw new UnauthorizedException("Account is not found")
    //     }

    //     const isPasswordMatch = await this.hashingService.compare(body.password, user.password)
    //     if (!isPasswordMatch) {
    //         throw new UnprocessableEntityException([
    //             {
    //                 field: "password",
    //                 error: "Password is not correct"
    //             }])
    //     }

    //     const tokens = await this.generateTokens({ userId: user.id })

    //     return tokens

    // }

    // async generateTokens(payload: { userId: number }) {
    //     const [accessToken, refreshToken] = await Promise.all([
    //         this.tokenService.signAccessToken(payload),
    //         this.tokenService.signRefreshToken(payload)
    //     ])

    //     //decode ==> get time expires token
    //     const decodeRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
    //     await this.prismaService.refreshToken.create({
    //         data: {
    //             token: refreshToken,
    //             userId: payload.userId,
    //             expiresAt: new Date(decodeRefreshToken.exp * 1000)
    //         }
    //     })

    //     return {
    //         accessToken,
    //         refreshToken
    //     }
    // }

    // async refreshToken(refreshToken: string) {
    //     try {
    //         // 1. Verify refresh token
    //         const { userId } = await this.tokenService.verifyRefreshToken(refreshToken)

    //         // 2. Check refresh token in database
    //         await this.prismaService.refreshToken.findFirstOrThrow({
    //             where: {
    //                 token: refreshToken
    //             }
    //         })

    //         // 3. Delete refresh token in database
    //         await this.prismaService.refreshToken.delete({
    //             where: {
    //                 token: refreshToken
    //             }
    //         })

    //         // 4. Generate new access token and refresh token
    //         return await this.generateTokens({ userId })

    //     } catch (e) {
    //         console.log(e);
    //         // Trường hợp đã refresh token rồi, hãy thông báo cho user biết
    //         // Refresh token của họ đã bị đánh cắp
    //         throw new UnauthorizedException("Refresh token is invalid")
    //     }

    // }

    // async logout(refreshToken: string) {
    //     try {
    //         // 1. Verify refresh token
    //         await this.tokenService.verifyRefreshToken(refreshToken)

    //         // 2. Delete refresh token in database
    //         await this.prismaService.refreshToken.delete({
    //             where: {
    //                 token: refreshToken
    //             }
    //         })

    //         return { message: "Logout successfully" }
    //     } catch (e) {
    //         console.log(e);
    //         // Trường hợp đã refresh token rồi, hãy thông báo cho user biết
    //         // Refresh token của họ đã bị đánh cắp
    //         throw new UnauthorizedException("Refresh token is invalid")
    //     }

    // }
}
