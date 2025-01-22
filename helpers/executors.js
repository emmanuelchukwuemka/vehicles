require('dotenv').config();
const axios = require('axios');
const { v4: uuid } = require("uuid")
const { formatCurrency } = require('./codeGen');
const { pool } = require('../connection/db');



