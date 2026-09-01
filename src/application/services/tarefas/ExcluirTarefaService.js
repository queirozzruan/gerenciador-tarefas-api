class ExcluirTarefaService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar(id) {
    const tarefa = await this.tarefaRepository.buscarPorId(id);

    if (!tarefa) {
      const erro = new Error('Tarefa não encontrada.');
      erro.statusCode = 404;
      throw erro;
    }

    await this.tarefaRepository.excluir(id);
  }
}

module.exports = ExcluirTarefaService;
