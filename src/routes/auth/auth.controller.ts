import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterBodyDTO, RegisterResponseDTO, SendOTPBodyDTO } from './auth.dto';
import { ZodSerializerDto } from 'nestjs-zod';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("register")
    @ZodSerializerDto(RegisterResponseDTO)
    async register(@Body() body: RegisterBodyDTO) {
        return await this.authService.register(body)
        // return new RegisterResponseDTO(result) Chú ý kiến cấu trúc dữ liệu của RegisterBodyDTO để pass qua được interceptors
    }

    @Post("otp")
    async sendOTP(@Body() body: SendOTPBodyDTO) {
        return await this.authService.sendOTP(body)
    }

    // @Post("login")
    // async login(@Body() body: LoginBodyDTO) {
    //     return new LoginResDTO(await this.authService.login(body))
    // }

    // @UseGuards(AccessTokenGuard)
    // @Post("refresh-token")
    // @HttpCode(HttpStatus.OK)
    // async refreshToken(@Body() body: RefreshTokenBodyDTO) {
    //     return new RefreshTokenResponseDTO(await this.authService.refreshToken(body.refreshToken))
    // }

    // @Post("logout")
    // async logout(@Body() body: LogoutBodyDTO) {
    //     return new LogoutResDTO(await this.authService.logout(body.refreshToken))
    // }

}
