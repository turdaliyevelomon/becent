//src/middlewares/upload.js

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, Date.now() + "image" + file.originalname.match(/\..*$/)[0]);
      }
    }
  });

const upload = multer({ storage: storage });

module.exports = upload;

