const mongoose = require("mongoose");

const setUpDatabase = async () => {
    try {
        const MONGO_USERNAME = process.env.MONGO_USERNAME;
        const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
        const MONGO_DATABASE = process.env.MONGO_DATABASE;
        const mongoDB = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo:27017/${MONGO_DATABASE}?authSource=admin`;
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoDB);
    }catch(error){
        console.error(error);
    }
}
const closeDatabase = async () => {
    try {
        mongoose.connection.close();
    }catch(error){
        console.error(error);
    }
}

module.exports = {setUpDatabase, closeDatabase}