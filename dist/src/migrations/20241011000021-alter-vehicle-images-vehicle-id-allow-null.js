'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('vehicle_images', 'vehicle_id', {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: 'vehicles',
                key: 'id',
            },
            onDelete: 'CASCADE',
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('vehicle_images', 'vehicle_id', {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'vehicles',
                key: 'id',
            },
            onDelete: 'CASCADE',
        });
    },
};
