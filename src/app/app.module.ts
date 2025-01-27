import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from 'src/notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { ConfigModule } from '@nestjs/config';
//import { APP_FILTER, APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    NotesModule,
    PessoasModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DW_TYPE as 'postgres', // Tipo do banco de dados
      host: process.env.DW_HOST, // Endereço do banco de dados
      port: +process.env.DW_PORT, // Porta padrão do postgres
      username: process.env.DW_USER, // Usuário do banco de dados
      password: process.env.DW_PASSWORD, // Senha do banco de dados
      database: process.env.DW_DATABASE, // Nome do banco de dados
      autoLoadEntities: Boolean(process.env.DW_AUTO_LOAD_ENTITIES), // Carregar entidades automaticamente
      retryAttempts: 2, // 2 tentativas
      retryDelay: 1000, // 1 segundo
      synchronize: Boolean(process.env.DW_SYNCRONIZE), // Não usar em produção
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /* {
      provide: APP_FILTER,
      useClass: ErrorExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: IsAdminGuard,
    }, */
  ],
  exports: [],
})
export class AppModule {}
/* export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer.apply(OutroMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  } */
