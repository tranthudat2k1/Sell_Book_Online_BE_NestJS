import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createCustomerDTO } from './dto/create-user.dto';
import { Tokens } from './types';
import { loginDTO } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { createStaffDTO } from './dto/create-staff.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: createCustomerDTO) {
    return this.authService.signupLocal(dto);
  }

  @Post('local/signup-staff')
  @HttpCode(HttpStatus.CREATED)
  signupStaffLocal(@Body() dto: createStaffDTO): Promise<Tokens> {
    return this.authService.signupLocalStaff(dto);
  }

  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: loginDTO): Promise<Tokens> {
    console.log(
      '🚀 ~ file: auth.controller.ts:30 ~ AuthController ~ signinLocal ~ loginDTO:',
      loginDTO,
    );
    return this.authService.signinLocal(dto);
  }

  @Post('local/signin-staff')
  @HttpCode(HttpStatus.OK)
  signinStaffLocal(@Body() dto: loginDTO): Promise<Tokens> {
    console.log(
      '🚀 ~ file: auth.controller.ts:30 ~ AuthController ~ signinLocal ~ loginDTO:',
      loginDTO,
    );
    return this.authService.signinStaffLocal(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req?.user;
    // return true;
    return this.authService.logout(user['userId']);
  }

  @UseGuards(AuthGuard('jwt-rt'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() req: Request) {
    const user = req.user;
    this.authService.refreshTokens(user['userId'], user['refreshToken']);
  }
}
