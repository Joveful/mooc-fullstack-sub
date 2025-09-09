const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: DataTypes.TEXT
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER
      },
    })
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      username: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      }
    })
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    })
    await queryInterface.addColumn('blogs', 'created_at', {
      type: DataTypes.DATE,
    }, { timestamps: true })
    await queryInterface.addColumn('blogs', 'updated_at', {
      type: DataTypes.DATE
    }, { timestamps: true })
    await queryInterface.addColumn('users', 'created_at', {
      type: DataTypes.DATE
    })
    await queryInterface.addColumn('users', 'updated_at', {
      type: DataTypes.DATE
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },
}
