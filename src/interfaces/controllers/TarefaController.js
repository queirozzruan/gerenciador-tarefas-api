class TarefaController {
  constructor({
    criarTarefaService,
    listarTarefasService,
    atualizarTarefaService,
    excluirTarefaService,
    iniciarTarefaService,
    concluirTarefaService
  }) {
    this.criarTarefaService = criarTarefaService;
    this.listarTarefasService = listarTarefasService;
    this.atualizarTarefaService = atualizarTarefaService;
    this.excluirTarefaService = excluirTarefaService;
    this.iniciarTarefaService = iniciarTarefaService;
    this.concluirTarefaService = concluirTarefaService;
  }

  async criar(req, res) {
    try {
      const tarefa = await this.criarTarefaService.executar(req.body);
      return res.status(201).json(tarefa);
    } catch (erro) {
      return res.status(erro.statusCode || 400).json({
        erro: erro.message
      });
    }
  }

  async listar(_req, res) {
    try {
      const tarefas = await this.listarTarefasService.executar();
      return res.status(200).json(tarefas);
    } catch (erro) {
      return res.status(erro.statusCode || 400).json({
        erro: erro.message
      });
    }
  }

  async atualizar(req, res) {
    try {
      const tarefa = await this.atualizarTarefaService.executar(
        req.params.id,
        req.body
      );

      return res.status(200).json(tarefa);
    } catch (erro) {
      return res.status(erro.statusCode || 400).json({
        erro: erro.message
      });
    }
  }

  async excluir(req, res) {
    try {
      await this.excluirTarefaService.executar(req.params.id);
      return res.status(204).send();
    } catch (erro) {
      return res.status(erro.statusCode || 400).json({
        erro: erro.message
      });
    }
  }

  async iniciar(req, res) {
    try {
      const tarefa = await this.iniciarTarefaService.executar(req.params.id);
      return res.status(200).json(tarefa);
    } catch (erro) {
      return res.status(erro.statusCode || 400).json({
        erro: erro.message
      });
    }
  }

  async concluir(req, res) {
    try {
      const tarefa = await this.concluirTarefaService.executar(req.params.id);
      return res.status(200).json(tarefa);
    } catch (erro) {
      return res.status(erro.statusCode || 400).json({
        erro: erro.message
      });
    }
  }
}

module.exports = TarefaController;
