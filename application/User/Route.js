import {Router} from 'express';
import UserController from './Controller';

export default ()=>{
    let router = Router();
    let ctrl = new UserController();

    router.get('/users', (req, res)=> ctrl.getAllUser(req, res));
    router.get('/user/:id', (req, res)=> ctrl.getUserById(req, res));
    router.post('/user', (req, res)=> ctrl.addNewUser(req, res));
    router.put('/user/:id', (req, res)=> ctrl.updateUser(req, res));
    router.delete('/user/:id', (req, res)=> ctrl.deleteUser(req, res));

    return router;
}