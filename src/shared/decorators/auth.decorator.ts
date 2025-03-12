import { SetMetadata } from '@nestjs/common'
import { AuthGuardType, ConditionGuard, ConditionGuardType } from 'src/shared/constants/auth.constant'

export const AUTH_TYPE_KEY = 'authType'

export type AuthTypeDecoratorPayload = { authTypes: AuthGuardType[]; options: { condition: ConditionGuardType } }

export const Auth = (authTypes: AuthGuardType[], options?: { condition: ConditionGuardType }) => {
    return SetMetadata(AUTH_TYPE_KEY, { authTypes, options: options ?? { condition: ConditionGuard.And } })
}