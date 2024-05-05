const multer = require("multer")

const profilePicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/profilePics")
    },
    
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
});

const profilePicUpload = multer({ storage: profilePicStorage });


//product pic

const productPicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/productPics")
    },
    
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
});
const productPicUpload = multer({ storage: productPicStorage });

//Edit product

const editProductPicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/productPics")
    },

    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const editProductPicUpload = multer({ storage: editProductPicStorage })

module.exports = { profilePicUpload, productPicUpload, editProductPicUpload };