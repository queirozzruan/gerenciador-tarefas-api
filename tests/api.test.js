process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/infrastructure/database/database');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await sequelize.truncate({ cascade: true, restartIdentity: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('API - Gerenciador de Tarefas', () => {
  test('POST /usuarios cria um usuário válido', async () => {
    const resposta = await request(app).post('/usuarios').send({
      nome: 'Ruan',
      email: 'ruan@example.com'
    });

    expect(resposta.status).toBe(201);
    expect(resposta.body.nome).toBe('Ruan');
    expect(resposta.body.email).toBe('ruan@example.com');
  });

  test('POST /tarefas cria uma tarefa vinculada ao usuário', async () => {
    const usuario = await request(app).post('/usuarios').send({
      nome: 'Ruan',
      email: 'ruan@example.com'
    });

    const resposta = await request(app).post('/tarefas').send({
      titulo: 'Estudar Clean Architecture',
      usuarioId: usuario.body.id
    });

    expect(resposta.status).toBe(201);
    expect(resposta.body.titulo).toBe('Estudar Clean Architecture');
    expect(resposta.body.status).toBe('PENDENTE');
    expect(resposta.body.usuarioId).toBe(usuario.body.id);
  });

  test('GET /tarefas lista todas as tarefas', async () => {
    const usuario = await request(app).post('/usuarios').send({
      nome: 'Ruan',
      email: 'ruan@example.com'
    });

    await request(app).post('/tarefas').send({
      titulo: 'Tarefa 1',
      usuarioId: usuario.body.id
    });

    await request(app).post('/tarefas').send({
      titulo: 'Tarefa 2',
      usuarioId: usuario.body.id
    });

    const resposta = await request(app).get('/tarefas');

    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveLength(2);
  });

  test('POST /tarefas/:id/iniciar muda o status para EM_ANDAMENTO', async () => {
    const usuario = await request(app).post('/usuarios').send({
      nome: 'Ruan',
      email: 'ruan@example.com'
    });

    const tarefa = await request(app).post('/tarefas').send({
      titulo: 'Começar trabalho',
      usuarioId: usuario.body.id
    });

    const resposta = await request(app).post(
      `/tarefas/${tarefa.body.id}/iniciar`
    );

    expect(resposta.status).toBe(200);
    expect(resposta.body.status).toBe('EM_ANDAMENTO');
  });

  test('bloqueia a sexta tarefa EM_ANDAMENTO do mesmo usuário', async () => {
    const usuario = await request(app).post('/usuarios').send({
      nome: 'Ruan',
      email: 'ruan@example.com'
    });

    const tarefas = [];

    for (let i = 1; i <= 6; i += 1) {
      const tarefa = await request(app).post('/tarefas').send({
        titulo: `Tarefa ${i}`,
        usuarioId: usuario.body.id
      });

      tarefas.push(tarefa.body);
    }

    for (let i = 0; i < 5; i += 1) {
      const resposta = await request(app).post(
        `/tarefas/${tarefas[i].id}/iniciar`
      );

      expect(resposta.status).toBe(200);
    }

    const sexta = await request(app).post(
      `/tarefas/${tarefas[5].id}/iniciar`
    );

    expect(sexta.status).toBe(400);
    expect(sexta.body.erro).toContain('Limite atingido');
  });

  test('PUT altera o texto e DELETE apaga a tarefa', async () => {
    const usuario = await request(app).post('/usuarios').send({
      nome: 'Ruan',
      email: 'ruan@example.com'
    });

    const tarefa = await request(app).post('/tarefas').send({
      titulo: 'Texto antigo',
      usuarioId: usuario.body.id
    });

    const atualizada = await request(app)
      .put(`/tarefas/${tarefa.body.id}`)
      .send({
        titulo: 'Texto alterado'
      });

    expect(atualizada.status).toBe(200);
    expect(atualizada.body.titulo).toBe('Texto alterado');

    const excluida = await request(app).delete(
      `/tarefas/${tarefa.body.id}`
    );

    expect(excluida.status).toBe(204);

    const listagem = await request(app).get('/tarefas');
    expect(listagem.body).toHaveLength(0);
  });
});
