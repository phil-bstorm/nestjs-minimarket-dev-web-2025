import { Controller, Get, Req } from '@nestjs/common';
import { UserDto } from 'src/dtos/user.dto';
import { RequireRole } from 'src/guards/require-role/require-role.decorator';
import type { RequestSession } from 'src/interfaces/session.interface';
import { UserEntityToDto } from 'src/mappers/user.mapper';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('me')
  @RequireRole()
  async me(@Req() req: RequestSession): Promise<{ data: UserDto }> {
    const user = await this._userService.getById(req.session!.id);
    const dto = UserEntityToDto(user);
    return { data: dto };
  }
}
