const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");

const bookCtrl = require("../controllers/books");

router.get('/',  bookCtrl.getBooks);
router.post('/', auth, bookCtrl.createBook);
router.get('/:id', auth, bookCtrl.getBook);
router.put('/:id', auth,  bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);


    
module.exports = router;