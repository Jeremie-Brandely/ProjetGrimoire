const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");

const bookCtrl = require("../controllers/books")

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

 
router.get('/', auth, bookCtrl.getAllBooks);
router.post('/', auth, bookCtrl.createBooks);
router.get('/:id', auth, bookCtrl.getOneBooks);
router.put('/:id', auth, bookCtrl.modifyBooks);
router.delete('/:id', auth, bookCtrl.deleteBooks);


    
module.exports = router;