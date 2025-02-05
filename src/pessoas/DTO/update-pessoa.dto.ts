import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoaDto } from './create-pessoa.dto';

// DTO para atualização de uma pessoa, utiliza como base o create-pessoa.dto.ts
export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {}
