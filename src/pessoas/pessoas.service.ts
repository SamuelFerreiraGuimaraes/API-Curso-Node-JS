import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Pessoa } from './entities/pessoa.entity';
import { CreatePessoaDto } from './DTO/create-pessoa.dto';
import { UpdatePessoaDto } from './DTO/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashServiceProtocol } from 'src/Auth/Hashing/hashing.service';

// Injetando o serviço
@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
    private readonly hashService: HashServiceProtocol,
  ) {}

  // Função para retornar um erro 404
  ErrorNotFound() {
    throw new NotFoundException('NOT FOUNDED');
  }

  // Função para retornar todas as pessoas
  async findAll() {
    const pessoas = await this.pessoaRepository.find();
    return pessoas;
  }

  // Função para retornar uma pessoa específica
  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOne({
      where: {
        id,
      },
    });
    if (pessoa) return pessoa;
    this.ErrorNotFound();
  }

  // Função para criar uma nova pessoa
  async createPessoa(CreatePessoaDto: CreatePessoaDto) {
    try {
      const hashPassword = await this.hashService.hashPassword(
        CreatePessoaDto.password,
      );

      const newPessoa = {
        name: CreatePessoaDto.name,
        email: CreatePessoaDto.email,
        password: CreatePessoaDto.password,
        PassHash: hashPassword,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const pessoa = await this.pessoaRepository.create(newPessoa);
      await this.pessoaRepository.save(pessoa);
      return pessoa;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('This email adress is created');
      }
      throw error;
    }
  }

  // Função para atualizar uma pessoa
  async updatePessoa(id: number, UpdatePessoaDto: UpdatePessoaDto) {
    const partialUpdateNoteDto = {
      name: UpdatePessoaDto?.name,
      email: UpdatePessoaDto?.email,
      password: UpdatePessoaDto?.password,
      //PassHash: UpdatePessoaDto?.PassHash,
    };

    if (UpdatePessoaDto?.password) {
      const hashPassword = await this.hashService.hashPassword(
        UpdatePessoaDto.password,
      );
      partialUpdateNoteDto['PassHash'] = hashPassword;
    }

    const pessoa = await this.pessoaRepository.preload({
      id,
      ...partialUpdateNoteDto,
    });

    if (!pessoa) {
      this.ErrorNotFound();
    }
    return this.pessoaRepository.save(pessoa);
  }

  // Função para deletar uma pessoa
  async removePessoa(id: number) {
    const pessoa = await this.pessoaRepository.findOne({
      where: {
        id,
      },
    });
    if (!pessoa) {
      this.ErrorNotFound();
    }
    return this.pessoaRepository.remove(pessoa);
  }
}
