const connectDB = require("./db/dbConnect");
const express = require("express");
const cors = require("cors");
const { profilePicUpload, productPicUpload, editProductPicUpload } = require("./multer/multerUpload");
const {SignUpAPI} = require("./api/signup");
const { LoginApi } = require("./api/login");
const session = require("express-session");
const { Session } = require("./api/session");
const { Logout } = require("./api/logout");
const { AddProduct } = require("./api/addProduct");
const { fetchProduct } = require("./api/fetchProduct");
const { GetProducts } = require("./api/getProduct");
const { EditProduct } = require("./api/editProducts");
const { DeleteProduct } = require("./api/deleteProduct");

const app = express();

const PORT = 8000;

//Middelwares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

//configue express-session middleware

app.use(
    session({
        secret: "Your-secret-key",
        resave: false,
        saveUninitialized: true,
    })
);

app.use("/images/profilePic", express.static("./images/profilePics"));
app.use("/images/productPic", express.static("./images/productPics"));

app.post("/signup", profilePicUpload.single("profilePic"),SignUpAPI);
app.post("/login", LoginApi)
app.post("/session", Session);
app.post("/logout", Logout);
app.post("/addPro", productPicUpload.single("pro_img"), AddProduct);
app.post("/fetchPro", fetchProduct);
app.post("/getproduct", GetProducts)
app.post("/editProduct", editProductPicUpload.single("pro_img"), EditProduct);
app.post("/deleteProduct", DeleteProduct);

// app.post()


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

connectDB();