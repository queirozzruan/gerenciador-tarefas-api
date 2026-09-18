const TarefaModel = require('../database/models/TarefaModel');
const UsuarioModel = require('../database/models/UsuarioModel');

class TarefaRepository {
  async criar(tarefa) {
    return TarefaModel.create({
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      status: tarefa.status,
      usuarioId: tarefa.usuarioId
    });
  }

  async listar() {
    return TarefaModel.findAll({
      include: [
        {
          model: UsuarioModel,
          as: 'usuario',
          attributes: ['id', 'nome', 'email']
        }
      ],
      order: [['id', 'ASC']]
    });
  }

  async buscarPorId(id) {
    return TarefaModel.findByPk(id);
  }

  async buscarPorUsuario(usuarioId) {
    return TarefaModel.findAll({
      where: { usuarioId },
      order: [['id', 'ASC']]
    });
  }

  async contarPorUsuarioEStatus(usuarioId, status) {
    return TarefaModel.count({
      where: {
        usuarioId,
        status
      }
    });
  }

  async atualizar(id, dados) {
    await TarefaModel.update(dados, {
      where: { id }
    });

    return this.buscarPorId(id);
  }

  async salvar(tarefa) {
    return this.atualizar(tarefa.id, {
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      status: tarefa.status,
      usuarioId: tarefa.usuarioId
    });
  }

  async excluir(id) {
    return TarefaModel.destroy({
      where: { id }
    });
  }
}

module.exports = TarefaRepository;
