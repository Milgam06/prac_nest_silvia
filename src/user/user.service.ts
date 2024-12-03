import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { v1 as uuid } from "uuid";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { PrismaService } from "src/prisma/prisma.service";
import {
  UserCreateDto,
  UserOutputDto,
  UserUpdateDto,
  UserAuthInputDto,
} from "./dto/user.dto";

@Injectable()
export class UserGqlService {
  constructor(
    private prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async getAllUsersData(): Promise<UserOutputDto[]> {
    return this.prismaService.user.findMany();
  }

  async createNewUser(createUserDto: UserCreateDto) {
    const isExistUser = await this.prismaService.verifyingDuplicateUser(
      createUserDto.nick
    );
    if (isExistUser.length > 0) {
      throw new HttpException(
        "해당 닉네임은 이미 존재합니다.",
        HttpStatus.FORBIDDEN
      );
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prismaService.user.create({
      data: {
        uuid: uuid(),
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async updateUser(updateUserDto: UserUpdateDto) {
    return this.prismaService.user.update({
      where: { nick: updateUserDto.updateUserNick },
      data: updateUserDto.updateData,
    });
  }

  async deleteUser(nick: string) {
    return this.prismaService.user.delete({
      where: { nick: nick },
    });
  }

  async loginValidation(userAuthDto: UserAuthInputDto) {
    const user = await this.prismaService.user.findUnique({
      where: { nick: userAuthDto.loginUserNick },
    });

    if (!user) {
      throw new HttpException(
        "존재하지 않는 사용자입니다.",
        HttpStatus.UNAUTHORIZED
      );
    }

    const isPasswordValid = await bcrypt.compare(
      userAuthDto.loginPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new HttpException(
        "비밀번호가 일치하지 않습니다.",
        HttpStatus.UNAUTHORIZED
      );
    }
    return user;
  }

  async loginUser(userAuthDto: UserAuthInputDto) {
    const user = await this.loginValidation(userAuthDto);
    const payload = { username: user.nick, sub: user.uuid };
    const access_token = this.jwtService.sign(payload, { expiresIn: "1h" });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: "7d" });

    const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
    this.updateUser({
      updateUserNick: userAuthDto.loginUserNick,
      updateData: { refreshToken: hashedRefreshToken },
    });
    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async logoutUser(nick: string) {
    return this.prismaService.user.update({
      where: { nick: nick },
      data: { refreshToken: null },
    });
  }

  async refreshUserAccessToken(refreshToken: string) {
    const checkTokenPayload = this.jwtService.verify(refreshToken);
    if (!checkTokenPayload) {
      throw new HttpException(
        "토큰이 유효하지 않습니다.",
        HttpStatus.UNAUTHORIZED
      );
    }

    const checkTokenUser = await this.prismaService.user.findUnique({
      where: { uuid: checkTokenPayload.sub },
    });

    if (!checkTokenUser) {
      throw new HttpException(
        "존재하지 않는 사용자입니다.",
        HttpStatus.UNAUTHORIZED
      );
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      checkTokenUser.refreshToken
    );

    if (!isRefreshTokenValid) {
      throw new HttpException(
        "토큰이 일치하지 않습니다.",
        HttpStatus.UNAUTHORIZED
      );
    }

    const newAccessToken = this.jwtService.sign(
      { username: chechTokenUser.nick, sub: chechTokenUser.uuid },
      { secret: this.configService.get<string>('JWT_SECRET_KEY'), expiresIn: "1h" }
    );
    return { access_token: newAccessToken };
  }
}
