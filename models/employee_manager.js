const EmployeeManager = (sequelize, DataTypes) => {
    const Model = sequelize.define('employee_manager', {
        employeeID: {
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.employee,
                key: 'id'
              }
        },
        managerID: {
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.manager,
                key: 'id'
              }
        }
    });
   
    return Model;
  };
   
  module.exports = EmployeeManager;