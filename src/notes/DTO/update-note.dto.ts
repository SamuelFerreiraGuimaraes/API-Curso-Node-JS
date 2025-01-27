import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

// DTO para atualização de uma nota
export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  /* readonly title?: string;

  readonly description?: string;

  readonly done?: boolean; */
}
