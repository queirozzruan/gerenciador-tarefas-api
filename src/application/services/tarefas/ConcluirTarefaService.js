const Tarefa = require('../../../domain/entities/Tarefa');

class ConcluirTarefaService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar(id) {
    const tarefaEncontrada = await this.tarefaRepository.buscarPorId(id);

    if (!tarefaEncontrada) {
      const erro = new Error('Tarefa não encontrada.');
      erro.statusCode = 404;
      throw erro;
    }

    const tarefa = new Tarefa({
      id: tarefaEncontrada.id,
      titulo: tarefaEncontrada.titulo,
      usuarioId: tarefaEncontrada.usuarioId,
      status: tarefaEncontrada.status
    });

    tarefa.concluir();

    return this.tarefaRepository.salvar(tarefa);
  }
}

module.exports = ConcluirTarefaService;
