'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('keywords', {
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
            keyword: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            relevance_score: {
                type: Sequelize.DECIMAL(3, 2),
                allowNull: false,
                defaultValue: 1.0,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
        await queryInterface.addIndex('keywords', ['listing_id']);
        await queryInterface.addIndex('keywords', ['keyword']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('keywords');
    },
};
