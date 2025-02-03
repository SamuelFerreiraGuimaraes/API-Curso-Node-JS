import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  UsePipes,
  //Inject,
} from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './DTO/create-pessoa.dto';
import { UpdatePessoaDto } from './DTO/update-pessoa.dto';
import { ParseIntIdPipe } from 'src/common/Pipes/Parse_Int_ID.pipe';
//import { NotesUtils } from 'src/notes/notes.utils';
//import { SERVER_NAME } from 'src/common/Filters/server_name.constant';

@Controller('pessoas')
@UsePipes(ParseIntIdPipe)
export class PessoasController {
  constructor(
    private readonly pessoasService: PessoasService,
    //private readonly noteUtils: NotesUtils,
    //@Inject(SERVER_NAME) private readonly VariableName: string,
  ) {}

  // Ler todas as pessoas
  // Método da solicitação GET
  @Get('GET_ALL')
  findAll() {
    //console.log(this.VariableName);
    return this.pessoasService.findAll();
  }

  // Ler uma pessoa específica
  // Método da solicitação GET
  @Get('GET_ONE/:id')
  findOne(@Param('id') id: number) {
    return this.pessoasService.findOne(id);
  }

  // Criar uma nova pessoa
  // Método da solicitação POST
  @Post('CREATE')
  createPessoa(@Body() CreateBodyDto: CreatePessoaDto) {
    return this.pessoasService.createPessoa(CreateBodyDto);
  }

  // Deletar uma pessoa
  // Método da solicitação DELETE
  @Delete('DELETE/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pessoasService.removePessoa(id);
  }

  // Atualizar uma pessoa
  // Método da solicitação PATCH
  @Patch('UPDATE/:id')
  updatePessoa(
    @Param('id') id: number,
    @Body() UpdateBodyDto: UpdatePessoaDto,
  ) {
    console.log(
      UpdateBodyDto.constructor.name,
      UpdateBodyDto instanceof UpdatePessoaDto,
    );
    return this.pessoasService.updatePessoa(id, UpdateBodyDto);
  }
}
