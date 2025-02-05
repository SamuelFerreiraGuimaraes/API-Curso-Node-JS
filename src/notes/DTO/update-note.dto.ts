import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

// DTO para atualização de uma nota, utiliza como base o create-note.dto.ts
export class UpdateNoteDto extends PartialType(CreateNoteDto) {}
