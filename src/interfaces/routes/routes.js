const express = require('express');

function criarRotas({ usuarioController, tarefaController }) {
  const router = express.Router();

  router.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  router.post('/usuarios', (req, res) => usuarioController.criar(req, res));
  router.get('/usuarios', (req, res) => usuarioController.listar(req, res));

  router.post('/tarefas', (req, res) => tarefaController.criar(req, res));
  router.get('/tarefas', (req, res) => tarefaController.listar(req, res));
  router.put('/tarefas/:id', (req, res) => tarefaController.atualizar(req, res));
  router.delete('/tarefas/:id', (req, res) => tarefaController.excluir(req, res));

  router.post('/tarefas/:id/iniciar', (req, res) =>
    tarefaController.iniciar(req, res)
  );

  router.post('/tarefas/:id/concluir', (req, res) =>
    tarefaController.concluir(req, res)
  );

  return router;
}

module.exports = criarRotas;
