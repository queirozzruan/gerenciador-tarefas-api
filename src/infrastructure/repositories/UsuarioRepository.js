const UsuarioModel = require('../database/models/UsuarioModel');

class UsuarioRepository {
  async criar(dados) {
    return UsuarioModel.create(dados);
  }

  async listar() {
    return UsuarioModel.findAll({
      order: [['id', 'ASC']]
    });
  }

  async buscarPorId(id) {
    return UsuarioModel.findByPk(id);
  }

  async buscarPorEmail(email) {
    return UsuarioModel.findOne({ where: { email } });
  }
}

module.exports = UsuarioRepository;
