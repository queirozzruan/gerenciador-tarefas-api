const express = require('express');
const {
  criarUsuarioSchema,
  criarTarefaSchema,
  validarRequisicao
} = require('../middlewares/validarRequisicao');

function criarRotas({ usuarioController, tarefaController }) {
  const router = express.Router();

  router.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  router.post(
    '/usuarios',
    validarRequisicao(criarUsuarioSchema),
    (req, res) => {
      /* #swagger.tags = ['Usuários'] */
      /* #swagger.description = 'Cria um novo usuário.' */
      /* #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/CriarUsuario' } } */
      /* #swagger.responses[201] = { description: 'Usuário criado com sucesso.' } */
      /* #swagger.responses[400] = { description: 'Dados de entrada inválidos.', schema: { $ref: '#/definitions/ErroValidacao' } } */
      return usuarioController.criar(req, res);
    }
  );

  router.get('/usuarios', (req, res) => {
    /* #swagger.tags = ['Usuários'] */
    /* #swagger.description = 'Lista todos os usuários cadastrados.' */
    /* #swagger.responses[200] = { description: 'Lista de usuários.' } */
    return usuarioController.listar(req, res);
  });

  router.post(
    '/tarefas',
    validarRequisicao(criarTarefaSchema),
    (req, res) => {
      /* #swagger.tags = ['Tarefas'] */
      /* #swagger.description = 'Cria uma tarefa com status inicial PENDENTE.' */
      /* #swagger.parameters['body'] = { in: 'body', required: true, description: 'Título, descrição opcional e ID do usuário responsável.', schema: { $ref: '#/definitions/CriarTarefa' } } */
      /* #swagger.responses[201] = { description: 'Tarefa criada com sucesso.' } */
      /* #swagger.responses[400] = { description: 'Dados de entrada inválidos.', schema: { $ref: '#/definitions/ErroValidacao' } } */
      /* #swagger.responses[404] = { description: 'Usuário não encontrado.' } */
      return tarefaController.criar(req, res);
    }
  );

  router.get('/tarefas', (req, res) => {
    /* #swagger.tags = ['Tarefas'] */
    /* #swagger.description = 'Lista todas as tarefas cadastradas.' */
    /* #swagger.responses[200] = { description: 'Lista de tarefas.' } */
    return tarefaController.listar(req, res);
  });
  router.put('/tarefas/:id', (req, res) => {
    /* #swagger.tags = ['Tarefas'] */
    /* #swagger.description = 'Atualiza o título de uma tarefa.' */
    /* #swagger.responses[200] = { description: 'Tarefa atualizada com sucesso.' } */
    /* #swagger.responses[404] = { description: 'Tarefa não encontrada.' } */
    return tarefaController.atualizar(req, res);
  });

  router.delete('/tarefas/:id', (req, res) => {
    /* #swagger.tags = ['Tarefas'] */
    /* #swagger.description = 'Exclui uma tarefa.' */
    /* #swagger.responses[204] = { description: 'Tarefa excluída com sucesso.' } */
    /* #swagger.responses[404] = { description: 'Tarefa não encontrada.' } */
    return tarefaController.excluir(req, res);
  });

  router.post('/tarefas/:id/iniciar', (req, res) => {
    /* #swagger.tags = ['Tarefas'] */
    /* #swagger.description = 'Inicia uma tarefa PENDENTE.' */
    /* #swagger.responses[200] = { description: 'Tarefa iniciada com sucesso.' } */
    /* #swagger.responses[400] = { description: 'Retornado quando o usuário atinge o limite máximo de 5 tarefas com status EM_ANDAMENTO.' } */
    /* #swagger.responses[404] = { description: 'Tarefa não encontrada.' } */
    return tarefaController.iniciar(req, res);
  });

  router.post('/tarefas/:id/concluir', (req, res) => {
    /* #swagger.tags = ['Tarefas'] */
    /* #swagger.description = 'Conclui uma tarefa EM_ANDAMENTO.' */
    /* #swagger.responses[200] = { description: 'Tarefa concluída com sucesso.' } */
    /* #swagger.responses[400] = { description: 'Retornado quando a tarefa não está com status EM_ANDAMENTO.' } */
    /* #swagger.responses[404] = { description: 'Tarefa não encontrada.' } */
    return tarefaController.concluir(req, res);
  });

  return router;
}

module.exports = criarRotas;
