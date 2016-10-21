import User from './Model';

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
        this.user.add(req.body, (errMessage, result)=>{
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