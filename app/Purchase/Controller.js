'use strict';

import Purchase from './Model';

class PurchaseController {
    constructor(){
        this.purchase = new Purchase();
    }

    getPurchaseItemPagination(req, res){
        this.purchase.getByPagination(req.param('offset'), req.param('limit'), (errMessage, result)=>{
            if(!errMessage && result) res.json(result);
            else res.status(500).send({error: errMessage});
        });
    }

    getPurchaseItemById(req, res){
        this.purchase.getById(req.param('id'), (errMessage, result)=>{
            if(!errMessage && result) res.json(result);
            else res.status(500).send({error: 'purchase item not found'});
        });
    }

    addNewPurchaseItem(req, res){
        this.purchase.add(req.body, (errMessage, result)=>{
            if(!errMessage && result) res.json(result);
            else res.status(500).send({error: errMessage});
        });
    }

    deletePurchaseItem(req, res){
        this.purchase.delete(req.param('id'), (errMessage, result)=>{
            if(!errMessage && result) res.json(result);
            else res.status(500).send({error: errMessage});
        });
    }
}

module.exports = PurchaseController;