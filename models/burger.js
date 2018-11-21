module.exports = function(sequelize, DataTypes) {
  var burgers = sequelize.define("burgers", {
    name: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a todo from being entered if it doesn't
      // have a text value
      allowNull: false,
      // len is a validation that checks that our todo is between 1 and 140 characters
      validate: {
        len: [1, 255]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      // defaultValue is a flag that defaults a new todos complete value to false if
      // it isn't supplied one
      defaultValue: false
    }
  });

  burgers.associate = function(models) {
    burgers.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return burgers;
};
