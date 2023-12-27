import Sequelize, { Model } from 'sequelize';


export class Companies extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      price_per_hour: Sequelize.FLOAT,
      city: Sequelize.STRING,
      state: Sequelize.STRING,
      owner: Sequelize.UUID,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    },{
      sequelize,
      tableName: 'companies',
      timestamps: true
    });
  };


  static associate(models) {
    Companies.belongsTo(models.Users, {
      as: 'owner_company',
      foreignKey: 'owner'
    });

    Companies.hasMany(models.Lots, {
      as: 'company_lot',
      foreignKey: 'company'
    });
  };
};