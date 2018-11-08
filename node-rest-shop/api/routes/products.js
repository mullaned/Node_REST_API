const express = require("express");
const router = express.Router();

const multer = require('multer')
//import check auth middleware
const checkAuth = require('../middleware/check-auth');

//import controllers
const ProductController = require('../controllers/products');

//set multer storeage options
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
});

//multer filter options
const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    //accept a file
    cb(null,true);
  }else{
    //reject all other filetypes
    cb(null, false);
  }
  
  
}

const upload = multer({
  storage: storage, 
  limits:{
  fileSize: 1024 * 1024 * 20
  },
  fileFilter: fileFilter
});


router.get("/", ProductController.products_get_all);

router.post("/", checkAuth, upload.single('productImage'), ProductController.products_create_product);

router.get("/:productId", ProductController.products_get_product);

router.patch("/:productId",  checkAuth, ProductController.products_update_product);

router.delete("/:productId",  checkAuth, ProductController.products_delete_product);

module.exports = router;
