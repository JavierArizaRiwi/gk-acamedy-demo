import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateServiceDto {
  @IsString() @MinLength(2) name: string;
  @IsString() @IsNotEmpty() description: string;
  @IsInt() @Min(0) price: number;
  @IsOptional() @IsString() currency?: string;
  @IsOptional() @IsInt() @Min(1) durationMinutes?: number;
  @IsOptional() @IsInt() @Min(0) order?: number;
  @IsOptional() @IsBoolean() active?: boolean;
}

export class UpdateServiceDto {
  @IsOptional() @IsString() @MinLength(2) name?: string;
  @IsOptional() @IsString() @IsNotEmpty() description?: string;
  @IsOptional() @IsInt() @Min(0) price?: number;
  @IsOptional() @IsString() currency?: string;
  @IsOptional() @IsInt() @Min(1) durationMinutes?: number;
  @IsOptional() @IsInt() @Min(0) order?: number;
  @IsOptional() @IsBoolean() active?: boolean;
}
