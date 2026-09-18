const Tarefa = require('../../../domain/entities/Tarefa');

class IniciarTarefaService {
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

    const quantidadeEmAndamento =
      await this.tarefaRepository.contarPorUsuarioEStatus(
        tarefaEncontrada.usuarioId,
        Tarefa.STATUS.EM_ANDAMENTO
      );

    if (quantidadeEmAndamento >= 5) {
      throw new Error(
        'Limite atingido: o usuário já possui 5 tarefas EM_ANDAMENTO.'
      );
    }

    const tarefa = new Tarefa({
      id: tarefaEncontrada.id,
      titulo: tarefaEncontrada.titulo,
      descricao: tarefaEncontrada.descricao,
      usuarioId: tarefaEncontrada.usuarioId,
      status: tarefaEncontrada.status
    });

    tarefa.iniciar();

    return this.tarefaRepository.salvar(tarefa);
  }
}

module.exports = IniciarTarefaService;
