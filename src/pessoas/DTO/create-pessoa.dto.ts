import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePessoaDto {
  // O campo name é uma string e é obrigatório
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  readonly name: string;

  // O campo email é uma string e é obrigatório
  @IsNotEmpty({ message: 'O campo email é obrigatório' })
  readonly email: string;

  // O campo password é uma string e é obrigatório
  @IsNotEmpty({ message: 'O campo password é obrigatório' })
  readonly password: string;

  // O campo PassHash é opcional
  @IsOptional()
  readonly PassHash: string;
}
