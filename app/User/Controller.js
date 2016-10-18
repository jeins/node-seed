'use strict';

import User from './Model';
import UserField from './Field';

class UserController {
    constructor(){
        this.user = new User();
    }

    getAllUser(req, res){
        this.user.getAll((result)=>{
           res.json(result);
        });
    }

    getUserById(req, res){
        this.user.getById(req.param('id'), (errMessage, result)=>{
            if(!errMessage && result) res.json(result);
            else res.status(500).send({error: "user not found"});
        });
    }

    addNewUser(req, res){
        var user = {};
        user[UserField.fullName.f] = req.body[UserField.fullName.f];
        user[UserField.email.f] = req.body[UserField.email.f];
        user[UserField.password.f] = req.body[UserField.password.f];

        this.user.add(user, (errMessage, result)=>{
            if(!errMessage && result){
                res.json(result);
            } else {
                res.status(500).send({error: errMessage})
            }
        })
        ;
    }

    updateUser(req, res){
        this.user.update(req.param('id'), req.body, (errMessage, result)=>{
            if(!errMessage && result) res.json(result);
            else res.status(500).send({error: errMessage});
        })
    }

    deleteUser(req, res){
        this.user.delete(req.param('id'), (errMessage, result)=>{
            if(!errMessage && result) res.json(result);
            else res.status(500).send({error: errMessage});
        })
    }
}

module.exports = UserController;