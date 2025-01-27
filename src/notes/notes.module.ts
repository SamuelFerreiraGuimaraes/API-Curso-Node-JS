import { forwardRef, Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/notes.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { NotesUtils, NotesUtilsMock } from './notes.utils';
import { SERVER_NAME } from 'src/common/Filters/server_name.constant';
import { RegExProtocol } from 'src/common/Utils/regex.protocol';
import { RemoveSpacesRegex } from 'src/common/Utils/Remove_Spaces.regex';
import { LowerCaseLetterRegex } from 'src/common/Utils/LowerCase_Letter.regex';

@Module({
  // Importando o TypeOrmModule e passando a entidade Note no Banco de Dados
  imports: [TypeOrmModule.forFeature([Note]), forwardRef(() => PessoasModule)],
  // Importando o controller
  controllers: [NotesController],
  // Importando o service
  providers: [
    NotesService,
    {
      provide: NotesUtils,
      useValue: new NotesUtilsMock(),
    },
    {
      provide: SERVER_NAME,
      useValue: 'My Name Is NestJS',
    },
    {
      provide: RegExProtocol,
      useValue: 1 === 1 ? RemoveSpacesRegex : LowerCaseLetterRegex,
    },
  ],
  exports: [NotesUtils, SERVER_NAME],
})
export class NotesModule {}
