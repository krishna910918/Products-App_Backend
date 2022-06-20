const express = require('express');
const { getProducts, uploadProducts } = require('../controllers/product');
const { authenticated } = require('../middleware/auth');

const multer = require('multer');

let fileStore = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads');
    },
    filename : (req,file,cb)=>{
        cb(null,Date.now() + '--' + file.originalname);
    }
});

let upload = multer({storage:fileStore});

const router = express.Router();

router.get('/products',authenticated,getProducts);
router.post('/products',authenticated,upload.single('file'),uploadProducts);

module.exports = router;