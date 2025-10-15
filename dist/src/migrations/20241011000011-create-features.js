'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('features', {
            id: {
                type: Sequelize.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            category: {
                type: Sequelize.ENUM('comfort', 'safety', 'sound', 'performance', 'utility'),
                allowNull: false,
            },
            feature_type: {
                type: Sequelize.ENUM('boolean', 'text', 'number', 'select'),
                allowNull: false,
                defaultValue: 'boolean',
            },
            icon: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
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
        await queryInterface.addIndex('features', ['category']);
        await queryInterface.addIndex('features', ['feature_type']);
        await queryInterface.addIndex('features', ['is_active']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('features');
    },
};
