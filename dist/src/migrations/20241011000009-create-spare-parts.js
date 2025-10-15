'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('spare_parts', {
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
            category: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            brand: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            part_number: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            compatible_vehicles: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            condition: {
                type: Sequelize.ENUM('new', 'used', 'refurbished'),
                allowNull: false,
                defaultValue: 'new',
            },
            warranty: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            quantity: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1,
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
        await queryInterface.addIndex('spare_parts', ['listing_id'], { unique: true });
        await queryInterface.addIndex('spare_parts', ['category']);
        await queryInterface.addIndex('spare_parts', ['brand']);
        await queryInterface.addIndex('spare_parts', ['part_number']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('spare_parts');
    },
};
