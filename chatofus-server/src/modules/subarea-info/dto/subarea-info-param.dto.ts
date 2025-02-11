import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class SubareaInfoParamDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/[0-9]/, {
    message: 'Le nom doit contenir au moins un caractère numérique.',
  })
  id: string;
}
