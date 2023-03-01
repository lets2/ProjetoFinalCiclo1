const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

const storage = multer.diskStorage({
    destination: "./public/assets/uploads",
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const filename = `${uuid.v4()}${extension}`;

        cb(null, filename);
    },
});

const upload = multer({ storage });

module.exports = upload;
