'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('saved_searches', {
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
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            search_criteria: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            notification_enabled: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            last_notified_at: {
                type: Sequelize.DATE,
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
        await queryInterface.addIndex('saved_searches', ['user_id']);
        await queryInterface.addIndex('saved_searches', ['notification_enabled']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('saved_searches');
    },
};
