const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API de Gerenciamento de Tarefas',
    description:
      'API para criação e acompanhamento de usuários e suas tarefas.',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    CriarUsuario: {
      nome: 'Maria Silva',
      email: 'maria@example.com'
    },
    CriarTarefa: {
      titulo: 'Estudar Swagger',
      descricao: 'Documentar os endpoints da API.',
      usuarioId: 1
    },
    ErroValidacao: {
      erro: 'Dados de entrada inválidos.',
      campos: [
        {
          campo: 'nome',
          mensagem: 'O nome deve ter pelo menos 3 caracteres.'
        }
      ]
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/interfaces/routes/routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
