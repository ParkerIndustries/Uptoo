const express = require('express')

const StorageController = require('../controllers/storage-controller')

const router = express.Router()

router.post('/product', StorageController.createProduct)
router.put('/product/:id', StorageController.updateProduct)
router.delete('/product/:id', StorageController.deleteProduct)
router.get('/product/:id', StorageController.getProductById)
router.get('/products', StorageController.getProducts)

module.exports = router