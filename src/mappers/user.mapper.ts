import { UserDto } from 'src/dtos/user.dto';
import { UserEntity } from 'src/entities/user.entity';

export function UserEntityToDto(entity: UserEntity): UserDto {
  const dto = new UserDto();

  dto.id = entity.id;
  dto.firstname = entity.firstname;
  dto.lastname = entity.lastname;
  dto.email = entity.email;
  dto.role = entity.role;

  return dto;
}
