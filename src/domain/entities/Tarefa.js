class Tarefa {
  static STATUS = {
    PENDENTE: 'PENDENTE',
    EM_ANDAMENTO: 'EM_ANDAMENTO',
    CONCLUIDA: 'CONCLUIDA'
  };

  constructor({
    id = null,
    titulo,
    descricao = null,
    usuarioId,
    status = Tarefa.STATUS.PENDENTE
  }) {
    if (!titulo || !titulo.trim()) {
      throw new Error('O título da tarefa é obrigatório.');
    }

    if (!usuarioId) {
      throw new Error('O usuário da tarefa é obrigatório.');
    }

    if (!Object.values(Tarefa.STATUS).includes(status)) {
      throw new Error('Status de tarefa inválido.');
    }

    this.id = id;
    this.titulo = titulo.trim();
    this.descricao = descricao ? descricao.trim() : null;
    this.usuarioId = usuarioId;
    this.status = status;
  }

  iniciar() {
    if (this.status !== Tarefa.STATUS.PENDENTE) {
      throw new Error('Somente tarefas PENDENTE podem ser iniciadas.');
    }

    this.status = Tarefa.STATUS.EM_ANDAMENTO;
  }

  concluir() {
    if (this.status !== Tarefa.STATUS.EM_ANDAMENTO) {
      throw new Error('Somente tarefas EM_ANDAMENTO podem ser concluídas.');
    }

    this.status = Tarefa.STATUS.CONCLUIDA;
  }
}

module.exports = Tarefa;
