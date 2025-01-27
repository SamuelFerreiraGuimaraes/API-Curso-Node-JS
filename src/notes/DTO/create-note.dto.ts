import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

// DTO para criação de uma nova nota
export class CreateNoteDto {
  // O campo title é uma string e é obrigatório
  @IsString()
  @IsNotEmpty({ message: 'O campo title é obrigatório' })
  readonly title: string;

  // O campo description é uma string e é obrigatório
  @IsString()
  @IsNotEmpty({ message: 'O campo description é obrigatório' })
  readonly description: string;

  @IsPositive()
  senderID: number;

  @IsPositive()
  receiverID: number;

  //Antigo

  /* // O campo sender é uma string e é obrigatório
  @IsString()
  @IsNotEmpty({ message: 'O campo sender é obrigatório' })
  readonly sender: string;

  // O campo receiver é uma string e é obrigatório
  @IsString()
  @IsNotEmpty({ message: 'O campo receiver é obrigatório' })
  readonly receiver: string; */

  // O campo done é um boolean e é opcional
  @IsBoolean()
  @IsOptional()
  readonly done: boolean;
}
