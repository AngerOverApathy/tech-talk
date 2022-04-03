const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')

const { Model, DataTypes } = require('sequelize')

class User extends Model {
    //method to run on a user instance to check the password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true, //this column is the primary key
          autoIncrement: true
          },
          username: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            }
          },
          email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true, //disallows duplicate
          validate: {
              isEmail: true
              }
          },
          password: {
          type: DataTypes.STRING,
           allowNull: false,
          validate: {
              len: [5]
              }
          }
    },
    {
        hooks: {
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10)
                return newUser;
            }
        }
    }
)

module.exports = User;