export const REQUEST_USER_KEY = 'user';

export const AuthType = {
    Bearer: 'Bearer',
    None: 'None',
    ApiKey: 'ApiKey'
} as const

export type AuthGuardType = (typeof AuthType)[keyof typeof AuthType]

export const ConditionGuard = {
    And: "and",
    Or: "or"
} as const

export type ConditionGuardType = (typeof ConditionGuard)[keyof typeof ConditionGuard]

export const UserStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    BLOCKED: 'BLOCKED',
} as const

export const TypeOfVerificationCode = {
    REGISTER: 'REGISTER',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
} as const

export type TypeOfVerificationCodeType = (typeof TypeOfVerificationCode)[keyof typeof TypeOfVerificationCode]