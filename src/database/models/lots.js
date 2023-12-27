import Sequelize, { Model } from 'sequelize';


export class Lots extends Model {
  static init(sequelize){
    super.init({
      client: Sequelize.STRING,
      plate: Sequelize.STRING,
      type_vehicle: Sequelize.ENUM("Car","Motocycle"),
      status: Sequelize.ENUM("Active","Closed"),
      company: Sequelize.UUID,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    },{
      sequelize,
      tableName: 'lots',
      timestamps: true
    });
  };

  static associate(models) {
    Lots.belongsTo(models.Companies, {
      as: 'company_lot',
      foreignKey: 'company'
    })
  }
}