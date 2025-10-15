'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('messages', {
            id: {
                type: Sequelize.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            sender_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            receiver_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            listing_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'listings',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            subject: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            message: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            is_read: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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
        await queryInterface.addIndex('messages', ['sender_id']);
        await queryInterface.addIndex('messages', ['receiver_id']);
        await queryInterface.addIndex('messages', ['listing_id']);
        await queryInterface.addIndex('messages', ['is_read']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('messages');
    },
};
