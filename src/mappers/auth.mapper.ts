import { RegisterDto } from 'src/dtos/auth.form.dto';
import { UserEntity } from 'src/entities/user.entity';

export function registerFormDtoToUserEntity(
  dto: RegisterDto,
): Omit<UserEntity, 'id' | 'role'> {
  console.log('LE DTO: ****************************');

  console.log(dto);

  const entity = new UserEntity();

  entity.firstname = dto.firstname;
  entity.lastname = dto.lastname;
  entity.email = dto.email;
  entity.password = dto.password;

  return entity;
}
