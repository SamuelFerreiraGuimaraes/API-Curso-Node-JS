import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Note } from './entities/notes.entity';
import { CreateNoteDto } from './DTO/create-note.dto';
import { UpdateNoteDto } from './DTO/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { PaginationDto } from 'src/common/DTO/paginatio.dto';
import { TokenPayloadDto } from 'src/Auth/DTO/token_payload.dto';
//import { NotesUtils } from './notes.utils';

// Injetando o serviço
@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    private readonly pessoaRepository: PessoasService,
    //private readonly noteUtils: NotesUtils,
  ) {}

  // Função para retornar um erro 404
  ErrorNotFound() {
    throw new NotFoundException('NOT FOUNDED');
  }

  // Função para retornar todas as mensagens
  async findAll(PaginationDto?: PaginationDto) {
    //console.log(this.noteUtils.inverteString('Samuel'));
    //valores do pagination para a função
    const { limit = 10, offset = 0 } = PaginationDto;

    const notes = await this.noteRepository.find({
      //paginação da query
      take: limit,
      skip: offset,
      // Limites de info da query
      relations: ['sender', 'receiver'],
      order: {
        id: 'desc',
      },
      select: {
        sender: {
          id: true,
          name: true,
        },
        receiver: {
          id: true,
          name: true,
        },
      },
    });
    return notes;
  }

  // Função para retornar uma mensagem específica
  async findOne(id: number) {
    //const notes = this.notes.find((item) => item.id === +id);
    const notes = await this.noteRepository.findOne({
      // novo
      relations: ['sender', 'receiver'],
      order: {
        id: 'desc',
      },
      select: {
        sender: {
          id: true,
          name: true,
        },
        receiver: {
          id: true,
          name: true,
        },
      },
      where: {
        id,
      },
    });
    if (notes) return notes;
    this.ErrorNotFound();
  }

  // Função para criar uma nova mensagem
  async createNote(
    CreateNoteDto: CreateNoteDto,
    tokenPayLoad: TokenPayloadDto,
  ) {
    // encontrar a pessoa que enviou e a que recebeu a messagem
    const { receiverID } = CreateNoteDto;

    // encontra a pessoa que envia a mensagem
    const sender = await this.pessoaRepository.findOne(tokenPayLoad.sub);
    // encontra a pessoa que recebe a mensagem
    const receiver = await this.pessoaRepository.findOne(receiverID);

    const newNote = {
      title: CreateNoteDto.title,
      description: CreateNoteDto.description,
      sender,
      receiver,
      done: CreateNoteDto.done,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const note = await this.noteRepository.create(newNote);
    await this.noteRepository.save(note);
    return {
      ...note,
      sender: {
        id: note.sender.id,
        name: note.sender.name,
      },
      receiver: {
        id: note.receiver.id,
        name: note.receiver.name,
      },
    };
  }

  // Função para atualizar uma mensagem
  async updateNote(
    id: number,
    UpdateNoteDto: UpdateNoteDto,
    tokenPayLoad: TokenPayloadDto,
  ) {
    const note = await this.findOne(id);

    if (note.sender.id !== tokenPayLoad.sub) {
      throw new ForbiddenException('You are not allowed to update this note');
    }

    note.title = UpdateNoteDto?.title ?? note.title;
    note.description = UpdateNoteDto?.title ?? note.title;

    await this.noteRepository.save(note);
    return note;
  }

  // Função para deletar uma mensagem
  async removeNote(id: number, tokenPayLoad: TokenPayloadDto) {
    const note = await this.findOne(id);

    if (note.sender.id !== tokenPayLoad.sub) {
      throw new ForbiddenException('You are not allowed to update this note');
    }

    if (!note) {
      this.ErrorNotFound();
    }
    return this.noteRepository.remove(note);
  }
}
