"use strict";
require('dotenv').config();
const dynamicKey = process.env.DYNAMIC_KEY;
const staticKey = Buffer.from(process.env.STATIC_KEY, 'hex');
module.exports = { dynamicKey, staticKey };
