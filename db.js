const Sequelize = require('sequelize');
const EmployeeModel = require('./models/employee');
const ManagerModel = require('./models/manager');
const DepartmentModel = require('./models/department');
const EmployeeManagerModel = require('./models/employee_manager');
const ManagerDeprtmentModel = require('./models/manager_department');
const config = process.env;

const sequelize = new Sequelize(
	config.DATABASE_DB,
	config.DATABASE_USER,
	config.DATABASE_PASS,
	{
		dialect: 'mysql',
		host: config.DATABASE_HOST,
		port: 3306
	}
);
 
const models = {
	Employee: EmployeeModel(sequelize, Sequelize.DataTypes),
	Manager: ManagerModel(sequelize, Sequelize.DataTypes),
	Department: DepartmentModel(sequelize, Sequelize.DataTypes),
	EmployeeManager: EmployeeManagerModel(sequelize, Sequelize.DataTypes),
	ManagerDeprtment: ManagerDeprtmentModel(sequelize, Sequelize.DataTypes),
};
 
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
	models[key].associate(models);
  }
});
 
module.exports = { sequelize, ...models, op: Sequelize.Op };