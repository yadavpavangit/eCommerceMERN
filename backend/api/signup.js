const connectDB = require("../db/dbConnect");

async function SignUpAPI(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection("users");

        const { email, phone, password, role } = req.body;
        const profilePic = req.file.filename;

        if (!email || !phone || !password || !role || !profilePic) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await collection.findOne({ email });
        console.log("User Exists", userExist);

        if (userExist) {
            return res
                .status(400)
                .json({ success: false, message: "user already exists " });
        }

        await collection.insertOne({
            email,
            phone,
            password,
            role,
            profilePic,
        });
        return res
            .status(200)
            .json({ success: true, message: "User created successfully " });
    } catch (error) {
        console.log("Resitration failed ", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
}

module.exports = { SignUpAPI };
