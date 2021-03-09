const Department = (sequelize, DataTypes) => {
    const Model = sequelize.define('department', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            required: true
        }
    });
   
    Model.associate = models => {
        Model.hasMany(models.Manager);
    };

    return Model;
  };
   
  module.exports = Department;