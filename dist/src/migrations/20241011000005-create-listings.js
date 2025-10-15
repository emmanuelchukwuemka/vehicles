'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('listings', {
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
            listing_type: {
                type: Sequelize.ENUM('car', 'bike', 'haulage', 'spare_part'),
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
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
            status: {
                type: Sequelize.ENUM('draft', 'active', 'inactive', 'sold', 'reserved'),
                allowNull: false,
                defaultValue: 'draft',
            },
            location: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            latitude: {
                type: Sequelize.DECIMAL(10, 8),
                allowNull: true,
            },
            longitude: {
                type: Sequelize.DECIMAL(11, 8),
                allowNull: true,
            },
            view_count: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
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
        await queryInterface.addIndex('listings', ['user_id']);
        await queryInterface.addIndex('listings', ['listing_type']);
        await queryInterface.addIndex('listings', ['status']);
        await queryInterface.addIndex('listings', ['price']);
        await queryInterface.addIndex('listings', ['location']);
        await queryInterface.addIndex('listings', ['latitude', 'longitude']);
        await queryInterface.addIndex('listings', ['title', 'description'], {
            type: 'FULLTEXT',
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('listings');
    },
};
