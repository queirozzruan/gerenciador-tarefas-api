const Tarefa = require('../../../domain/entities/Tarefa');

class CriarTarefaService {
  constructor(tarefaRepository, usuarioRepository) {
    this.tarefaRepository = tarefaRepository;
    this.usuarioRepository = usuarioRepository;
  }

  async executar({ titulo, usuarioId }) {
    const usuario = await this.usuarioRepository.buscarPorId(usuarioId);

    if (!usuario) {
      const erro = new Error('Usuário não encontrado.');
      erro.statusCode = 404;
      throw erro;
    }

    const tarefa = new Tarefa({
      titulo,
      usuarioId
    });

    return this.tarefaRepository.criar(tarefa);
  }
}

module.exports = CriarTarefaService;
