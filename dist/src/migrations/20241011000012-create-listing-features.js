'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('listing_features', {
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
            feature_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'features',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            custom_value: {
                type: Sequelize.TEXT,
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
        await queryInterface.addIndex('listing_features', ['listing_id']);
        await queryInterface.addIndex('listing_features', ['feature_id']);
        await queryInterface.addIndex('listing_features', ['listing_id', 'feature_id'], { unique: true });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('listing_features');
    },
};
