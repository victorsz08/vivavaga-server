import Sequelize from 'sequelize';
import sequelize from '../config/sequelize.js';
import { Lots } from "./lots.js"; 
import { Companies } from "./companies.js";
import { Users } from "./users.js"; 

const models = [Users, Companies, Lots];


class Database {
  constructor() {
    this.connection = sequelize
    this.init()
    this.associate()
  }

  init() {
    models.forEach(model => model.init(this.connection))
  }

  associate() {
    models.forEach(model => {
      if(model.associate) {
        model.associate(this.connection.models)
      }
    })
  }

}

export default new Database();




