import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
export class RegisterDto {
  @IsString() name: string;
  @IsEmail() email: string;
  @MinLength(6) password: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsIn(['STUDENT','CUSTOMER']) role?: 'STUDENT'|'CUSTOMER';
}
export class LoginDto { @IsEmail() email:string; @IsString() password:string; }
