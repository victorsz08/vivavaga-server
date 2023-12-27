import Sequelize, { Model } from 'sequelize';


export class Users extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      lastname: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    }, {
      sequelize,
      tableName: 'users',
      timestamps: true
    })
  };


  static associate(models) {
    Users.hasMany(models.Companies, {
      as: 'owner_company',
      foreignKey: 'owner'
    })
  };

};