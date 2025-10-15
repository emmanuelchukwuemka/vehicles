'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const hashedPassword = await bcrypt.hash('Admin123!', 10);
        await queryInterface.bulkInsert('users', [
            {
                email: 'admin@carmarketplace.com',
                password_hash: hashedPassword,
                full_name: 'Admin User',
                phone: null,
                role: 'admin',
                is_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', { email: 'admin@carmarketplace.com' });
    },
};
