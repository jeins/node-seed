
import {Router} from 'express';
import PurchaseController from './Controller';

export default ()=>{
    let router = Router();
    let ctrl = new PurchaseController();

    router.get('/purchase/:id', (req, res)=> ctrl.getPurchaseItemById(req, res));
    router.get('/purchases/:offset/:limit', (req, res)=> ctrl.getPurchaseItemPagination(req, res));
    router.post('/purchase', (req, res)=> ctrl.addNewPurchaseItem(req, res));
    router.delete('/purhcase', (req, res)=> ctrl.deletePurchaseItem(req, res));

    return router;
}