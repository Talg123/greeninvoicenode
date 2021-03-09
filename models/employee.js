const Employee = (sequelize, DataTypes) => {
    const Model = sequelize.define('employee', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.TEXT,
            required: true
        },
        lastName: {
            type: DataTypes.TEXT,
            required: true
        }
    });
   
    Model.associate = models => {
        Model.belongsTo(models.Manager);
    };

    return Model;
  };
   
  module.exports = Employee;