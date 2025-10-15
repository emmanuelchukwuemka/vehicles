'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('orders', {
            id: {
                type: Sequelize.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: false,
            },
            listing_id: {
                type: Sequelize.BIGINT.UNSIGNED,
                allowNull: false,
            },
            quantity: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1,
            },
            unit_price: {
                type: Sequelize.DECIMAL(12, 2),
                allowNull: false,
            },
            total_price: {
                type: Sequelize.DECIMAL(12, 2),
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
                allowNull: false,
                defaultValue: 'pending',
            },
            payment_status: {
                type: Sequelize.ENUM('pending', 'paid', 'failed', 'refunded'),
                allowNull: false,
                defaultValue: 'pending',
            },
            shipping_address: {
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
        // Add foreign keys
        await queryInterface.addConstraint('orders', {
            fields: ['user_id'],
            type: 'foreign key',
            name: 'fk_orders_user_id',
            references: {
                table: 'users',
                field: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        await queryInterface.addConstraint('orders', {
            fields: ['listing_id'],
            type: 'foreign key',
            name: 'fk_orders_listing_id',
            references: {
                table: 'listings',
                field: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        // Add indexes
        await queryInterface.addIndex('orders', ['user_id']);
        await queryInterface.addIndex('orders', ['listing_id']);
        await queryInterface.addIndex('orders', ['status']);
        await queryInterface.addIndex('orders', ['payment_status']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('orders', 'fk_orders_user_id');
        await queryInterface.removeConstraint('orders', 'fk_orders_listing_id');
        await queryInterface.dropTable('orders');
    },
};
