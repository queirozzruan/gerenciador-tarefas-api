const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');

const UsuarioRepository = require('./infrastructure/repositories/UsuarioRepository');
const TarefaRepository = require('./infrastructure/repositories/TarefaRepository');

const CriarUsuarioService = require('./application/services/usuarios/CriarUsuarioService');
const ListarUsuariosService = require('./application/services/usuarios/ListarUsuariosService');

const CriarTarefaService = require('./application/services/tarefas/CriarTarefaService');
const ListarTarefasService = require('./application/services/tarefas/ListarTarefasService');
const AtualizarTarefaService = require('./application/services/tarefas/AtualizarTarefaService');
const ExcluirTarefaService = require('./application/services/tarefas/ExcluirTarefaService');
const IniciarTarefaService = require('./application/services/tarefas/IniciarTarefaService');
const ConcluirTarefaService = require('./application/services/tarefas/ConcluirTarefaService');

const UsuarioController = require('./interfaces/controllers/UsuarioController');
const TarefaController = require('./interfaces/controllers/TarefaController');
const criarRotas = require('./interfaces/routes/routes');

require('./infrastructure/database/models/TarefaModel');

const usuarioRepository = new UsuarioRepository();
const tarefaRepository = new TarefaRepository();

const criarUsuarioService = new CriarUsuarioService(usuarioRepository);
const listarUsuariosService = new ListarUsuariosService(usuarioRepository);

const criarTarefaService = new CriarTarefaService(
  tarefaRepository,
  usuarioRepository
);
const listarTarefasService = new ListarTarefasService(tarefaRepository);
const atualizarTarefaService = new AtualizarTarefaService(tarefaRepository);
const excluirTarefaService = new ExcluirTarefaService(tarefaRepository);
const iniciarTarefaService = new IniciarTarefaService(tarefaRepository);
const concluirTarefaService = new ConcluirTarefaService(tarefaRepository);

const usuarioController = new UsuarioController({
  criarUsuarioService,
  listarUsuariosService
});

const tarefaController = new TarefaController({
  criarTarefaService,
  listarTarefasService,
  atualizarTarefaService,
  excluirTarefaService,
  iniciarTarefaService,
  concluirTarefaService
});

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  criarRotas({
    usuarioController,
    tarefaController
  })
);

module.exports = app;
