class ListarUsuariosService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async executar() {
    return this.usuarioRepository.listar();
  }
}

module.exports = ListarUsuariosService;
