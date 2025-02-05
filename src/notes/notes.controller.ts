import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';

import { NotesService } from './notes.service';
import { CreateNoteDto } from './DTO/create-note.dto';
import { UpdateNoteDto } from './DTO/update-note.dto';
import { PaginationDto } from 'src/common/DTO/paginatio.dto';
import { ParseIntIdPipe } from 'src/common/Pipes/Parse_Int_ID.pipe';
import { NotesUtils } from './notes.utils';

/* Essa parte é para utilizar protocolos REGEX no código */
//import { SERVER_NAME } from 'src/common/Filters/server_name.constant';
//import { RegExProtocol } from 'src/common/Utils/regex.protocol';
//import { AddHeaderInterceptor } from 'src/common/Interceptors/Add_Header.Interceptor';

// CRUD DE NOTAS
// Create -> Post -> Cria Notas
// Read -> Get -> Ler Notas
// Update -> Put -> Atualizar o recurso inteiro
// Update -> Patch -> Atualizar um parametro ou mais parametros
// Delete -> Delete -> Deletar Notas

// DTO -> Data Transfer Object -> Objeto de Transferência de Dados
// DTO -> É um objeto que carrega dados entre processos
// DTO -> Objeto simples -> Validar e transformar dados

@Controller('notes')
@UsePipes(ParseIntIdPipe)
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly noteUtils: NotesUtils,
    /* Essa parte é para utilizar protocolos REGEX no código */
    //@Inject(SERVER_NAME)
    //private readonly VariableName: string,
    //private readonly regexProtocol: RegExProtocol,
  ) {}

  // Ler todas as notas - Método da solicitaão GET
  @Get()
  async findAll(@Query() PaginationDto: PaginationDto) {
    const note = await this.notesService.findAll(PaginationDto);
    return note;
  }

  // Ler uma nota específica - Método da solicitaão GET
  @Get(':id')
  findOne(@Param('id') id: number) {
    //console.log(this.VariableName);
    return this.notesService.findOne(id);
  }

  // Criar uma nova nota - Método da solicitaão POST
  @Post()
  createNote(@Body() CreateBodyDto: CreateNoteDto) {
    return this.notesService.createNote(CreateBodyDto);
  }

  //Deletar uma nota - Método da solicitaão DELETE
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.notesService.removeNote(id);
  }

  // Atualizar uma nota - Método da solicitaão PATCH
  @Patch(':id')
  updateNote(@Param('id') id: number, @Body() UpdateBodyDto: UpdateNoteDto) {
    console.log(
      UpdateNoteDto.constructor.name,
      UpdateNoteDto instanceof UpdateNoteDto,
    );
    return this.notesService.updateNote(id, UpdateBodyDto);
  }
}
