'use strict';

import Product from './Model';

class ProductController {
    constructor(){
        this.product = new Product();
    }

    getAllProduct(req, res){
        this.product.getAll((result)=>{
            res.json(result);
        });
    }

    getProductById(req, res){
        this.product.getById(req.param('id'), (errMessage, result)=>{
            if(!errMessage && result) res.json(result);
            else res.status(500).send({error: "product not found"});
        });
    }

    addNewProduct(req, res){
        this.product.add(req.body, (errMessage, result)=>{
            if(!errMessage && result){
                res.json(result);
            } else {
                res.status(500).send({error: errMessage})
            }
        })
        ;
    }

    updateProduct(req, res){
        this.product.update(req.param('id'), req.body, (errMessage, result)=>{
            if(!errMessage && result) res.json(result);
            else res.status(500).send({error: errMessage});
        })
    }

    deleteProduct(req, res){
        this.product.delete(req.param('id'), (errMessage, result)=>{
            if(!errMessage && result) res.json(result);
            else res.status(500).send({error: errMessage});
        })
    }
}

module.exports = ProductController;