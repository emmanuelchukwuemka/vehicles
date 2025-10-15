'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('cars', {
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
            mileage: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            fuel_type: {
                type: Sequelize.ENUM('petrol', 'diesel', 'electric', 'hybrid'),
                allowNull: true,
            },
            transmission: {
                type: Sequelize.ENUM('manual', 'automatic'),
                allowNull: true,
            },
            engine_capacity: {
                type: Sequelize.DECIMAL(4, 2),
                allowNull: true,
            },
            body_type: {
                type: Sequelize.STRING(50),
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
        await queryInterface.addIndex('cars', ['listing_id'], { unique: true });
        await queryInterface.addIndex('cars', ['make']);
        await queryInterface.addIndex('cars', ['model']);
        await queryInterface.addIndex('cars', ['year']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('cars');
    },
};
