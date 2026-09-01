const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const UsuarioModel = require('./UsuarioModel');

const TarefaModel = sequelize.define(
  'Tarefa',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PENDENTE',
      validate: {
        isIn: [['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA']]
      }
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UsuarioModel,
        key: 'id'
      }
    }
  },
  {
    tableName: 'tarefas'
  }
);

UsuarioModel.hasMany(TarefaModel, {
  foreignKey: 'usuarioId',
  as: 'tarefas',
  onDelete: 'CASCADE'
});

TarefaModel.belongsTo(UsuarioModel, {
  foreignKey: 'usuarioId',
  as: 'usuario'
});

module.exports = TarefaModel;
