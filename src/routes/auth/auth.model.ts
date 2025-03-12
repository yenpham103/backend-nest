import { TypeOfVerificationCode } from 'src/shared/constants/auth.constant'
import { UserSchema } from 'src/shared/models/shared-user.model'
import { z } from 'zod'

export const RegisterBodySchema = UserSchema.pick({
    email: true,
    password: true,
    name: true,
    phoneNumber: true
}).extend({
    confirmPassword: z.string().min(6).max(100),
    code: z.string().length(6)
}).strict().superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Password does not match",
            path: ["confirmPassword"],
        })
    }
})

export type RegisterBodyType = z.infer<typeof RegisterBodySchema>

export const RegisterResSchema = UserSchema.omit({
    password: true,
    totpSecret: true
})

export const VerificationCode =  z.object({
    id: z.number(),
    email: z.string().email(),
    code: z.string().length(6),
    type: z.enum([TypeOfVerificationCode.REGISTER, TypeOfVerificationCode.FORGOT_PASSWORD]),
    expiresAt: z.date(),
    createdAt: z.date(),
})

export type VerificationCodeType = z.infer<typeof VerificationCode>

export const SendOTPBodySchema = VerificationCode.pick({
    email: true,
    type: true
})

export type SendOTPBodyType = z.infer<typeof SendOTPBodySchema>