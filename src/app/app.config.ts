import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  database: {
    type: process.env.DW_TYPE as 'postgres', // ----------------------- Tipo do banco de dados
    host: process.env.DW_HOST, // ------------------------------------- Endereço do banco de dados
    port: +process.env.DW_PORT, // ------------------------------------ Porta padrão do postgres
    username: process.env.DW_USER, // --------------------------------- Usuário do banco de dados
    password: process.env.DW_PASSWORD, // ----------------------------- Senha do banco de dados
    database: process.env.DW_DATABASE, // ----------------------------- Nome do banco de dados
    autoLoadEntities: Boolean(process.env.DW_AUTO_LOAD_ENTITIES), // -- Carregar entidades automaticamente
    retryAttempts: 2, // --------------------------------------------- 2 tentativas
    retryDelay: 1000, // --------------------------------------------- 1 segundo
    synchronize: Boolean(process.env.DW_SYNCRONIZE), // -------------- Não usar em produção
  },
  enviroment: process.env.NODE_ENV || 'development', // -------------- Ambiente de execução
}));
