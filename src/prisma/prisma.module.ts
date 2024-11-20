import { Module, Global } from "@nestjs/common";

import { PrismaService } from "./prisma.service";

@Global() // 모듈 글로벌화 (전역에서 import 없이, providers, exports 사용 가능)
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
