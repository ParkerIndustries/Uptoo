const Storage = require('../models/storage-model')

createProduct = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Entrez un produit',
        })
    }

    const product = new Storage(body)

    if (!product) {
        return res.status(400).json({
            success: false,
            error:'Champ(s) vide(s)',
        })
    }
    product.save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: product._id,
                message: 'Produit enregistré',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Echec'
            })
        })
}

updateProduct = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Entrez des informations pour la modification',
        })
    }

    Storage.findOne({ _id: req.params.id }, (err, product) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Produit introuvable',
            })
        }
        product.title = body.title
        product.description = body.description
        product.data = body.data
        product
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: product._id,
                    title: product.title,
                    description: product.description,
                    data: product.data,
                    message: 'Produit modifié',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Produit non modifié',
                })
            })
    })
}

deleteProduct = async (req, res) => {
    await Storage.findOneAndDelete({ _id: req.params.id }, (err, product) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!product) {
            return res
                .status(404)
                .json({ success: false, error: `Produit introuvable` })
        }

        return res.status(200).json({ success: true, data: product })
    }).catch(err => console.log(err))
}

getProductById = async (req, res) => {
    await Storage.findOne({ _id: req.params.id }, (err, product) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!product) {
            return res
                .status(404)
                .json({ success: false, error: `Produit introuvable` })
        }
        return res.status(200).json({ success: true, data: product })
    }).catch(err => console.log(err))
}

getProducts = async (req, res) => {
    await Storage.find({}, (err, products) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!products.length) {
            return res
                .status(404)
                .json({ success: false, error: `Produit introuvable` })
        }
        return res.status(200).json({ success: true, data: products })
    }).catch(err => console.log(err))
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById,
}