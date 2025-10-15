'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('vehicles', {
            id: {
                type: Sequelize.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            title: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            brand: {
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
            price: {
                type: Sequelize.DECIMAL(12, 2),
                allowNull: false,
            },
            currency: {
                type: Sequelize.CHAR(3),
                allowNull: false,
                defaultValue: 'USD',
            },
            mileage: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            condition: {
                type: Sequelize.ENUM('new', 'used'),
                allowNull: false,
                defaultValue: 'used',
            },
            transmission: {
                type: Sequelize.ENUM('manual', 'automatic'),
                allowNull: true,
            },
            fuel_type: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            status: {
                type: Sequelize.ENUM('pending', 'approved', 'rejected', 'sold'),
                allowNull: false,
                defaultValue: 'pending',
            },
            location: {
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
        await queryInterface.addIndex('vehicles', ['brand']);
        await queryInterface.addIndex('vehicles', ['year']);
        await queryInterface.addIndex('vehicles', ['price']);
        await queryInterface.addIndex('vehicles', ['title', 'description'], {
            type: 'FULLTEXT',
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('vehicles');
    },
};
