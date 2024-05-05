const connectDB = require("../db/dbConnect");
const { ObjectId } = require("mongodb")

async function AddProduct(req, res) {
    try {
        const db = await connectDB()
        const collection = db.collection("products");

        const { pro_price, pro_name, pro_desc } = req.body;
        const pro_img = req.file.filename;

        const userId = req.session.user.session._id;

        if (req.session === null) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" })
        }

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized User!" })
        }

        if (!pro_name || !pro_price || !pro_desc || !pro_img) {
            return res.status(400).json({ success: false, message: "all field requier" })
        }

        await collection.insertOne({
            uid: ObjectId.createFromHexString(userId),
            pro_name,
            pro_price,
            pro_desc,
            pro_img,
        });

        return res.status(201).json({ success: true, message: "Product Added Successfully" })

    } catch (error) {
        console.error("Product Add Failed", error);
        return res.status(500).json({ success: false, error: "Product Add Failed" })
    }
}

module.exports = { AddProduct };