const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const convertImage = require("../middleware/sharp");

const bookCtrl = require("../controllers/books");

router.post("/:id/rating", auth, bookCtrl.postRating);
router.get('/', bookCtrl.getAllBooks);
router.get("/bestrating", bookCtrl.getBooksWithBestRating);
router.post('/', auth, multer, convertImage, bookCtrl.createBook);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, multer, convertImage, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
   
module.exports = router;