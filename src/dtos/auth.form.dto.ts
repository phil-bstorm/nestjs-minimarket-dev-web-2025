import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

// DTO register
export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  firstname: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

// DTO login
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
