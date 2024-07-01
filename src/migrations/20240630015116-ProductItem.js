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
    await queryInterface.createTable('product_items', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      size: {
          type: Sequelize.STRING,
          allowNull: false
      },
      color: {
          type: Sequelize.STRING,
          allowNull: false
      },
      sku: {
          type: Sequelize.STRING,
          allowNull: false
      },
      price: {
          type: Sequelize.FLOAT,
          allowNull: false
      },
      promotion_price: {
          type: Sequelize.FLOAT,
          allowNull: true
      },
      productId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'products',
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
