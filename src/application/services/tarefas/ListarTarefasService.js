class ListarTarefasService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar() {
    return this.tarefaRepository.listar();
  }
}

module.exports = ListarTarefasService;
