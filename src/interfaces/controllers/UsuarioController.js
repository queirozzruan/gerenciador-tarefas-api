class UsuarioController {
  constructor({ criarUsuarioService, listarUsuariosService }) {
    this.criarUsuarioService = criarUsuarioService;
    this.listarUsuariosService = listarUsuariosService;
  }

  async criar(req, res) {
    try {
      const usuario = await this.criarUsuarioService.executar(req.body);
      return res.status(201).json(usuario);
    } catch (erro) {
      return res.status(erro.statusCode || 400).json({
        erro: erro.message
      });
    }
  }

  async listar(_req, res) {
    try {
      const usuarios = await this.listarUsuariosService.executar();
      return res.status(200).json(usuarios);
    } catch (erro) {
      return res.status(erro.statusCode || 400).json({
        erro: erro.message
      });
    }
  }
}

module.exports = UsuarioController;
