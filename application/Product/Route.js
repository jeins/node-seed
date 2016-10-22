import {Router} from 'express';
import ProductController from './Controller';

export default ()=>{
    let router = Router();
    let ctrl = new ProductController();

    router.get('/api/products', (req, res)=> ctrl.getAllProduct(req, res));
    router.get('/api/product/:id', (req, res)=> ctrl.getProductById(req, res));
    router.post('/api/product', (req, res)=> ctrl.addNewProduct(req, res));
    router.put('/api/product/:id', (req, res)=> ctrl.updateProduct(req, res));
    router.delete('/api/product/:id', (req, res)=> ctrl.deleteProduct(req, res));

    return router;
}