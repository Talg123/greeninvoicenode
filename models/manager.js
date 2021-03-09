const Manager = (sequelize, DataTypes) => {
    const Model = sequelize.define('manager', {
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
        Model.belongsTo(models.Department);
    };

    return Model;
  };
   
  module.exports = Manager;