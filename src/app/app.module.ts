import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from 'src/notes/notes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import appConfig from './app.config';
import { AuthModule } from 'src/Auth/auth.module';

/* Essa parte é para utilizar protocolos REGEX no código */
//import * as Joi from '@hapi/joi';
// import appConfig from './app.config';
// import { Type } from 'class-transformer';
// import { APP_FILTER, APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    NotesModule,
    PessoasModule,
    AuthModule,
    ConfigModule.forRoot(),
    ConfigModule.forFeature(appConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY],
      useFactory: (appConfiguration: ConfigType<typeof appConfig>) => {
        return {
          type: appConfiguration.database.type,
          host: appConfiguration.database.host,
          port: appConfiguration.database.port,
          username: appConfiguration.database.username,
          password: appConfiguration.database.password,
          database: appConfiguration.database.database,
          autoLoadEntities: appConfiguration.database.autoLoadEntities,
          retryAttempts: appConfiguration.database.retryAttempts,
          retryDelay: appConfiguration.database.retryDelay,
          synchronize: appConfiguration.database.synchronize,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // Essa parte é para utilizar exception filters e guards
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

// Essa parte é para utilizar middlewares no código
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
