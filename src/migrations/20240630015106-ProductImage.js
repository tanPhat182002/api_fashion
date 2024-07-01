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
    await queryInterface.createTable('product_images', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
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
      url: {
          type: Sequelize.STRING,
          allowNull: false
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
