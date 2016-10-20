import {Router} from 'express';
import ProductController from './Controller';

export default ()=>{
    let router = Router();
    let ctrl = new ProductController();

    router.get('/products', (req, res)=> ctrl.getAllProduct(req, res));
    router.get('/product/:id', (req, res)=> ctrl.getProductById(req, res));
    router.post('/product', (req, res)=> ctrl.addNewProduct(req, res));
    router.put('/product/:id', (req, res)=> ctrl.updateProduct(req, res));
    router.delete('/product/:id', (req, res)=> ctrl.deleteProduct(req, res));

    return router;
}