const { magenta, bold } = require('colorette');
const mongoose = require('mongoose');
require('dotenv').config(); 

const database = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(magenta(bold("Database connected successfully!")));
    } catch (err) {
        console.log(err);
    }
};
module.exports = database;
