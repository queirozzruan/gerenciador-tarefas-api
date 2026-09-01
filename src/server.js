const app = require('./app');
const sequelize = require('./infrastructure/database/database');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`API executando em http://localhost:${PORT}`);
    });
  } catch (erro) {
    console.error('Erro ao iniciar a API:', erro);
    process.exit(1);
  }
}

iniciarServidor();
