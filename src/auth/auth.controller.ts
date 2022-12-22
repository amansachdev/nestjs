import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    dto: AuthDto,
  ) {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(
    @Body(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    dto: AuthDto,
  ) {
    return this.authService.signin(dto);
  }
}
