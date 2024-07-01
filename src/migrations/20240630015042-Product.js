'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('products', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      description: {
          type: Sequelize.TEXT,
          allowNull: true
      },
      sku: {
          type: Sequelize.STRING,
          allowNull: false
      },

      rating: {
          type: Sequelize.FLOAT,
          allowNull: false
      },
      sold: {
          type: Sequelize.INTEGER,
          allowNull: false
      },

      categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'categories',
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      brandId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'brands',
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
    }
     
  })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
