import { Injectable } from "@nestjs/common";
import { PrismaService } from "../service/prisma.service";
import { UserType } from "../models/shared-user.model";

@Injectable()
export class SharedUserRepository {
    constructor(
        private readonly prismaService: PrismaService
    ){}

    async findUnique (uniqueObject: {email: string } | {id: number}) : Promise<UserType | null> {
        return await this.prismaService.user.findUnique({ where: uniqueObject })
    }
} 