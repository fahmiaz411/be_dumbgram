'use strict';
const {
  Model
} = require('sequelize');
const { use } = require('../src/routers');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.follow, {
        as: 'follower',
        foreignKey: {
          name: 'idFollowing'
        }
      })

      user.hasMany(models.follow, {
        as: 'following',
        foreignKey: {
          name: 'idFollower'
        }
      })      
      user.hasMany(models.feed, {
        as: 'posts',
        foreignKey: {
          name: 'idUser'
        }
      })


    }
  };
  user.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    bio: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};