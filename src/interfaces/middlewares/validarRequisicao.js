const { z } = require('zod');

const criarUsuarioSchema = z.object({
  nome: z
    .string({ error: 'O nome é obrigatório.' })
    .trim()
    .min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  email: z
    .string({ error: 'O e-mail é obrigatório.' })
    .trim()
    .email('Informe um e-mail válido.')
});

const criarTarefaSchema = z.object({
  titulo: z
    .string({ error: 'O título é obrigatório.' })
    .trim()
    .min(3, 'O título deve ter pelo menos 3 caracteres.'),
  descricao: z
    .string({ error: 'A descrição deve ser um texto.' })
    .trim()
    .min(1, 'A descrição não pode ser vazia.')
    .max(500, 'A descrição deve ter no máximo 500 caracteres.')
    .optional(),
  usuarioId: z
    .number({ error: 'O ID do usuário é obrigatório.' })
    .int('O ID do usuário deve ser um número inteiro.')
    .positive('O ID do usuário deve ser maior que zero.')
});

function validarRequisicao(schema) {
  return (req, res, next) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        erro: 'Dados de entrada inválidos.',
        campos: resultado.error.issues.map((issue) => ({
          campo: issue.path.join('.') || 'body',
          mensagem: issue.message
        }))
      });
    }

    req.body = resultado.data;
    return next();
  };
}

module.exports = {
  criarUsuarioSchema,
  criarTarefaSchema,
  validarRequisicao
};
