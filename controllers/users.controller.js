const express = require("express")
const router = express.Router()
const service = require("../services/users.service.js")
require('dotenv').config();
const { reloadController } = require("../helpers/dataReload.controller.js");


router.post("/login", async (req, res) => {

    try {
        const response = await service.login_User(req);

        if (response && response.success) {

            reloadController(res, response)

        } else {

            const errorMessage = response.error || 'Error establishing connection to the server';
            res.status(401).json({ success: false, error: errorMessage });
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }

});

router.post("/create-account", async (req, res) => {

    try {

        const result = await service.create_user(req);

        if (result && result.success) {

            res.json({
                success: true,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Error establishing connection to the server';
            res.status(400).json({ success: false, error: errorMessage });
        }

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Internal Server Error');
    }

})


module.exports = router