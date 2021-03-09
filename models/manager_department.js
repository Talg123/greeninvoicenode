const ManagerDepartment = (sequelize, DataTypes) => {
    const Model = sequelize.define('manager_department', {
        departmentID: {
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.department,
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
   
  module.exports = ManagerDepartment;