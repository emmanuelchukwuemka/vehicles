'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('media', {
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
      file_url: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      file_type: {
        type: Sequelize.ENUM('image', 'video'),
        allowNull: false,
      },
      file_size: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      dimensions: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      is_primary: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      sort_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      alt_text: {
        type: Sequelize.STRING(255),
        allowNull: true,
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
    await queryInterface.addIndex('media', ['listing_id']);
    await queryInterface.addIndex('media', ['file_type']);
    await queryInterface.addIndex('media', ['is_primary']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('media');
  },
};
