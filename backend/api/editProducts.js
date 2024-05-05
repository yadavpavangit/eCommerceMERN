const { ObjectId } = require("mongodb");
const connectDB = require("../db/dbConnect");

async function EditProduct(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("products");

    if (!req.session.user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user!" });
    }

    const userId = req.session.user.session._id;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user!" });
    }

    const { pId, pro_price, pro_name, pro_desc } = req.body;
    const pro_img = req.file ? req.file.filename : null;

    if (!pId || !pro_name || !pro_price || !pro_desc) {
      return res
        .status(400)
        .json({ success: false, message: "all field requier" });
    }

    const updatedFieleds = {};

    if (pro_price) {
      updatedFieleds.pro_price = pro_price;
    }
    if (pro_name) {
      updatedFieleds.pro_name = pro_name;
    }
    if (pro_desc) {
      updatedFieleds.pro_desc = pro_desc;
    }
    if (pro_img) {
      updatedFieleds.pro_img = pro_img;
    }

    const result = await collection.updateOne(
      {
        _id: ObjectId.createFromHexString(pId),
        uid: ObjectId.createFromHexString(userId),
      },
      { $set: updatedFieleds }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(402)
        .json({ success: false, message: "No changes Done" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Product update Successfully" });
  } catch (error) {
    console.error("Edit product Failed", error);
    return res
      .status(500)
      .json({ success: true, message: "Edit Product Failed" });
  }
}

module.exports = { EditProduct };
