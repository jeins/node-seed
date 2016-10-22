import {Router} from 'express';
import UserController from './Controller';
import AuthController from './AuthController';

export default ()=>{
    let router = Router();
    let ctrl = new UserController();
    let authCtrl = new AuthController();

    router.post('/login', (req, res)=> authCtrl.login(req, res));
    router.post('/register', (req, res)=> authCtrl.register(req, res));

    router.get('/api/users', (req, res)=> ctrl.getAllUser(req, res));
    router.get('/api/user/:id', (req, res)=> ctrl.getUserById(req, res));
    //router.post('/api/user', (req, res)=> ctrl.addNewUser(req, res));
    router.put('/api/user/:id', (req, res)=> ctrl.updateUser(req, res));
    router.delete('/api/user/:id', (req, res)=> ctrl.deleteUser(req, res));

    return router;
}