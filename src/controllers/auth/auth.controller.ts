import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from 'src/dtos/auth.form.dto';
import { registerFormDtoToUserEntity } from 'src/mappers/auth.mapper';
import { UserService } from 'src/services/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<void> {
    // transformer le Dto en entité
    const data = registerFormDtoToUserEntity(body);

    // appel du service pour enregistrer le user en db
    await this._userService.register(data);

    // TODO un email de confirmation
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<{ token: string }> {
    const user = await this._userService.login(body);

    const token = this._jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return { token };
  }
}
