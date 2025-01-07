import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class PlayerInfoParamDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/[A-Za-z0-9]/, {
    message: 'Le nom doit contenir au moins un caractère alphanumérique.',
  })
  name: string;
}
