"use strict";
const db = require('../../Models/dbConfig/db.Config');
// declare all characters
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 1; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const GenerateCards = () => {
    let price = (Math.random() * 100).toFixed();
    let card_code = generateString(50);
    const user_id = 0;
    const is_processing = 0;
    const processed = 0;
    const SQL = `INSERT INTO GiftCards(card_code,price)VALUES(?,?)`;
    db.query(SQL, [card_code, price], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Card Created");
        }
    });
};
module.exports = GenerateCards;
