'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bikes', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      listing_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'listings',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      make: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      engine_capacity: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
      },
      bike_type: {
        type: Sequelize.ENUM('sport', 'cruiser', 'touring', 'off-road', 'scooter', 'electric'),
        allowNull: true,
      },
      mileage: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      condition: {
        type: Sequelize.ENUM('new', 'used'),
        allowNull: false,
        defaultValue: 'used',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add indexes
    await queryInterface.addIndex('bikes', ['listing_id'], { unique: true });
    await queryInterface.addIndex('bikes', ['make']);
    await queryInterface.addIndex('bikes', ['bike_type']);
    await queryInterface.addIndex('bikes', ['year']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bikes');
  },
};
