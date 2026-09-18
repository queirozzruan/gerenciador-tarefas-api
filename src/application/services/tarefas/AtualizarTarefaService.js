const Tarefa = require('../../../domain/entities/Tarefa');

class AtualizarTarefaService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar(id, { titulo }) {
    const tarefaEncontrada = await this.tarefaRepository.buscarPorId(id);

    if (!tarefaEncontrada) {
      const erro = new Error('Tarefa não encontrada.');
      erro.statusCode = 404;
      throw erro;
    }

    const tarefa = new Tarefa({
      id: tarefaEncontrada.id,
      titulo: titulo ?? tarefaEncontrada.titulo,
      descricao: tarefaEncontrada.descricao,
      usuarioId: tarefaEncontrada.usuarioId,
      status: tarefaEncontrada.status
    });

    return this.tarefaRepository.salvar(tarefa);
  }
}

module.exports = AtualizarTarefaService;
