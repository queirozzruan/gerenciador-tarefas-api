class CriarUsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async executar({ nome, email }) {
    if (!nome || !nome.trim()) {
      throw new Error('O nome do usuário é obrigatório.');
    }

    if (!email || !email.trim()) {
      throw new Error('O e-mail do usuário é obrigatório.');
    }

    const usuarioExistente = await this.usuarioRepository.buscarPorEmail(email.trim());

    if (usuarioExistente) {
      throw new Error('Já existe um usuário com esse e-mail.');
    }

    return this.usuarioRepository.criar({
      nome: nome.trim(),
      email: email.trim()
    });
  }
}

module.exports = CriarUsuarioService;
