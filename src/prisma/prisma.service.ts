import { Injectable, OnModuleInit } from "@nestjs/common";
// Injectable: 의존성 주입을 위한 데코레이터 .like useContext
// OnModuleInit: 모듈이 초기화 될 때 실행되는 메소드 .like useEffect
import { PrismaClient } from "@prisma/client";

@Injectable() // PrismaService를 DI컨테이너에 등록시킴. 진짜 이해 하나도 안됨 "메이데이"
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect(); // 여기서 this는 PrismaClient를 상속 받은 PrismaService
  }

  async verifyingDuplicateUser(nick: string) {
    return await this.user.findMany({
      where: {
        nick: nick,
      },
    });
  }
}
