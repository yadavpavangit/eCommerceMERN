const  MongoClient  = require("mongodb").MongoClient;

const connectDB = async () => {
    const dbUrl = "mongodb+srv://pavany77:yadavpvn2002@clusteryp.g13k7ho.mongodb.net/Products";

    try {
        const client = await MongoClient.connect(dbUrl);
        console.log("DB Connected");
        return client.db();
    }
    catch (error) {
        console.log("DB Connected Error: ", error);
        throw error;
    }
};

module.exports = connectDB;
